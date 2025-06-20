import { test, expect } from '@playwright/test';

const taskId = process.env.TASK_ID;
if (!taskId) throw new Error('Не указана переменная окружения TASK_ID');

test(`${taskId}`, async ({ page }, testInfo) => {
  console.log('Resolved URL:', page.url());
  console.log('Environment:');
  console.log('PR_NUMBER:', process.env.PR_NUMBER);
  console.log('BASE_URL:', testInfo.project.use?.baseURL);

  await page.goto('/');
  const fileName = `${taskId}.png`;

  await expect(page).toHaveScreenshot(fileName, {
    fullPage: true,
    animations: 'disabled',
  });
});
