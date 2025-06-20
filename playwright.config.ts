import { defineConfig } from '@playwright/test';

const prNumber = process.env.PR_NUMBER;
const isCI = Boolean(process.env.CI);
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];

const baseURL = isCI
  ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io/${repoName}/pr-${prNumber}`
  : 'http://localhost:8080';

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
