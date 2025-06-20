import { defineConfig } from '@playwright/test';

const isCI = Boolean(process.env.CI);
const prNumber = process.env.PR_NUMBER;
const repo = process.env.GITHUB_REPOSITORY;

if (isCI && (!prNumber || !repo)) {
  throw new Error('В CI необходимо указать PR_NUMBER и GITHUB_REPOSITORY');
}

const [owner, repoName] = repo?.split('/') || [];
const baseURL = isCI
  ? `https://${owner}.github.io/${repoName}/pr-${prNumber}/`
  : 'http://localhost:8080/';

export default defineConfig({
  testDir: './tests',
  use: {
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: {
        viewport: { width: 1440, height: 900 },
        baseURL,
      },
    },
    {
      name: 'mobile',
      use: {
        viewport: { width: 475, height: 800 },
        baseURL,
      },
    },
  ],
});
