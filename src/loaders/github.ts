import type { Loader, LoaderContext } from 'astro/loaders';
import matter from 'gray-matter';

interface GitHubLoaderOptions {
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

const WORDS_PER_MINUTE = 200;
const RATE_LIMIT_WARN_THRESHOLD = 10;

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function checkRateLimit(response: Response, logger: LoaderContext['logger']): void {
  const remaining = response.headers.get('X-RateLimit-Remaining');
  const reset = response.headers.get('X-RateLimit-Reset');
  if (remaining === null) return;

  const count = parseInt(remaining, 10);
  if (count < RATE_LIMIT_WARN_THRESHOLD) {
    const resetAt = reset
      ? new Date(parseInt(reset, 10) * 1000).toLocaleTimeString()
      : 'unknown';
    logger.warn(
      `GitHub API rate limit low: ${count} requests remaining (resets at ${resetAt})`,
    );
  }
}

export async function fetchGitHubContent({
  owner,
  repo,
  path,
  branch = 'main',
  token,
}: GitHubLoaderOptions) {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API error fetching ${owner}/${repo}/${path}: ${response.status} ${response.statusText}`);
  }

  const entries = (await response.json()) as GitHubEntry[];
  const markdownFiles = entries.filter(
    (e) => e.type === 'file' && /\.mdx?$/.test(e.name) && e.download_url !== null,
  );

  return Promise.all(
    markdownFiles.map(async (file) => {
      const fileResponse = await fetch(file.download_url!);
      if (!fileResponse.ok) return null;

      const raw = await fileResponse.text();
      const { data: frontmatter, content: body } = matter(raw);

      if (frontmatter.readingTime === undefined) {
        frontmatter.readingTime = readingTime(body);
      }

      return {
        id: file.name.replace(/\.mdx?$/, ''),
        data: frontmatter,
        body,
        sha: file.sha,
      };
    }),
  ).then(results => results.filter((r): r is NonNullable<typeof r> => r !== null));
}

export function githubLoader(options: GitHubLoaderOptions): Loader {
  const { owner, repo, path, token } = options;
  return {
    name: 'github-loader',
    async load({ store, logger, parseData, generateDigest, renderMarkdown, meta }: LoaderContext) {
      const etagKey = `etag:${owner}/${repo}/${path}`;
      const storedEtag = meta.get(etagKey);
      
      // We still use the manual fetch here to handle ETags correctly within Astro's loader context
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
      };
      if (token) headers.Authorization = `Bearer ${token}`;
      if (storedEtag) headers['If-None-Match'] = storedEtag;

      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${options.branch || 'main'}`;
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
      const markdownFiles = entries.filter(
        (e) => e.type === 'file' && /\.mdx?$/.test(e.name) && e.download_url !== null,
      );

      const currentIds = new Set(markdownFiles.map((f) => f.name.replace(/\.mdx?$/, '')));
      for (const id of store.keys()) {
        if (!currentIds.has(id)) {
          store.delete(id);
          logger.info(`Removed deleted entry: ${id}`);
        }
      }

      let updated = 0;
      let skipped = 0;

      await Promise.all(
        markdownFiles.map(async (file) => {
          const shaKey = `sha:${file.path}`;
          const id = file.name.replace(/\.mdx?$/, '');

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
          const { data: frontmatter, content: body } = matter(raw);

          if (frontmatter.readingTime === undefined) {
            frontmatter.readingTime = readingTime(body);
          }

          const digest = generateDigest(raw);
          let data;
          try {
            data = await parseData({ id, data: frontmatter });
          } catch (e) {
            logger.error(`Validation failed for ${file.path}: ${e instanceof Error ? e.message : String(e)}`);
            return;
          }

          const rendered = await renderMarkdown(body);
          store.set({ id, data, body, digest, rendered });
          meta.set(shaKey, file.sha);
          updated++;
        }),
      );

      logger.info(`${owner}/${repo}/${path}: ${updated} updated, ${skipped} unchanged`);
    },
  };
}

