import { test, expect } from '@playwright/test';

const taskId = process.env.TASK_ID;
if (!taskId) throw new Error('Не указана переменная окружения TASK_ID');

test(`${taskId}`, async ({ page }, testInfo) => {
  const fileName = `${taskId}.png`;

  console.log('Resolved page.goto URL:', testInfo.project.use?.baseURL);
  console.log('PR_NUMBER:', process.env.PR_NUMBER);
  console.log('TASK_ID:', taskId);

  await page.goto('/');
  await expect(page).toHaveScreenshot(fileName, {
    fullPage: true,
    animations: 'disabled',
  });
});
