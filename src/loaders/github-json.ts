import type { Loader, LoaderContext } from 'astro/loaders';

interface GitHubJsonLoaderOptions {
  owner: string;
  repo: string;
  path: string;
  branch?: string;
  token?: string;
}

interface GitHubEntry {
  name: string;
  path: string;
  type: string;
  download_url: string | null;
  sha: string;
}

function checkRateLimit(response: Response, logger: LoaderContext['logger']): void {
  const remaining = response.headers.get('X-RateLimit-Remaining');
  const reset = response.headers.get('X-RateLimit-Reset');
  if (remaining === null) return;

  const count = parseInt(remaining, 10);
  if (count < 10) {
    const resetAt = reset
      ? new Date(parseInt(reset, 10) * 1000).toLocaleTimeString()
      : 'unknown';
    logger.warn(`GitHub API rate limit low: ${count} requests remaining (resets at ${resetAt})`);
  }
}

export function githubJsonLoader({
  owner,
  repo,
  path,
  branch = 'main',
  token,
}: GitHubJsonLoaderOptions): Loader {
  return {
    name: 'github-json-loader',
    async load({ store, logger, parseData, generateDigest, meta }: LoaderContext) {
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
      };

      if (token) headers.Authorization = `Bearer ${token}`;

      const etagKey = `etag:${owner}/${repo}/${path}`;
      const storedEtag = meta.get(etagKey);
      if (storedEtag) headers['If-None-Match'] = storedEtag;

      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
      let listResponse = await fetch(url, { headers });

      checkRateLimit(listResponse, logger);

      if (listResponse.status === 304) {
        if (store.keys().length > 0) {
          logger.info(`No changes in ${owner}/${repo}/${path}, skipping`);
          return;
        }
        meta.delete(etagKey);
        delete headers['If-None-Match'];
        listResponse = await fetch(url, { headers });
        checkRateLimit(listResponse, logger);
      }

      if (!listResponse.ok) {
        logger.error(
          `GitHub API error fetching ${owner}/${repo}/${path}: ${listResponse.status} ${listResponse.statusText}`,
        );
        return;
      }

      const newEtag = listResponse.headers.get('ETag');
      if (newEtag) meta.set(etagKey, newEtag);

      const entries = (await listResponse.json()) as GitHubEntry[];
      const jsonFiles = entries.filter(
        (e) => e.type === 'file' && e.name.endsWith('.json') && e.download_url !== null,
      );

      // Remove entries for files that no longer exist in the repo
      const currentIds = new Set(jsonFiles.map((f) => f.name.replace(/\.json$/, '')));
      for (const id of store.keys()) {
        if (!currentIds.has(id)) {
          store.delete(id);
          logger.info(`Removed deleted entry: ${id}`);
        }
      }

      let updated = 0;
      let skipped = 0;

      await Promise.all(
        jsonFiles.map(async (file) => {
          const shaKey = `sha:${file.path}`;
          const id = file.name.replace(/\.json$/, '');

          if (meta.get(shaKey) === file.sha && store.has(id)) {
            skipped++;
            return;
          }

          const fileResponse = await fetch(file.download_url!);
          if (!fileResponse.ok) {
            logger.warn(`Skipping ${file.path}: ${fileResponse.status}`);
            return;
          }

          const raw = await fileResponse.text();

          let parsed: unknown;
          try {
            parsed = JSON.parse(raw);
          } catch {
            logger.warn(`Skipping ${file.path}: not valid JSON`);
            return;
          }

          const digest = generateDigest(raw);
          const data = await parseData({ id, data: parsed });

          store.set({ id, data, digest });
          meta.set(shaKey, file.sha);
          updated++;
        }),
      );

      logger.info(`${owner}/${repo}/${path}: ${updated} updated, ${skipped} unchanged`);
    },
  };
}
