import type { Loader, LoaderContext } from 'astro/loaders';

interface ResumeLoaderOptions {
  owner: string;
  repo: string;
  path: string;
  branch?: string;
  token?: string;
}

interface GitHubFileEntry {
  sha: string;
  download_url: string | null;
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

export function resumeLoader({
  owner,
  repo,
  path,
  branch = 'main',
  token,
}: ResumeLoaderOptions): Loader {
  return {
    name: 'resume-loader',
    async load({ store, logger, parseData, generateDigest, meta }: LoaderContext) {
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
      };

      if (token) headers.Authorization = `Bearer ${token}`;

      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
      const metaResponse = await fetch(url, { headers });

      checkRateLimit(metaResponse, logger);

      if (!metaResponse.ok) {
        logger.error(
          `GitHub API error fetching resume metadata: ${metaResponse.status} ${metaResponse.statusText}`,
        );
        return;
      }

      const entry = (await metaResponse.json()) as GitHubFileEntry;

      const shaKey = 'sha:resume';
      if (meta.get(shaKey) === entry.sha && store.has('resume')) {
        logger.info('Resume unchanged, skipping');
        return;
      }

      if (!entry.download_url) {
        logger.error('GitHub did not return a download_url for the resume file');
        return;
      }

      const contentResponse = await fetch(entry.download_url);
      if (!contentResponse.ok) {
        logger.error(`Failed to download resume: ${contentResponse.status} ${contentResponse.statusText}`);
        return;
      }

      const raw = await contentResponse.text();

      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        logger.error('Resume file is not valid JSON');
        return;
      }

      const digest = generateDigest(raw);
      const data = await parseData({ id: 'resume', data: parsed });

      store.set({ id: 'resume', data, digest });
      meta.set(shaKey, entry.sha);

      logger.info(`Resume loaded from ${owner}/${repo}/${path}`);
    },
  };
}
