import { test, expect } from '@playwright/test';

const taskId = process.env.TASK_ID;
if (!taskId) throw new Error('Не указана переменная окружения TASK_ID');

test(`${taskId}`, async ({ page }) => {
  const response = await page.goto('/');
  console.log('Resolved page.goto URL:', response?.url());
  console.log('Status:', response?.status());

  if (!response || !response.ok() || response.status() === 404) {
    throw new Error(`Страница не загрузилась корректно: ${response?.status()}`);
  }

  await page.waitForSelector('.container', { timeout: 10000 });

  const fileName = `${taskId}.png`;
  await expect(page).toHaveScreenshot(fileName, {
    fullPage: true,
    animations: 'disabled',
  });
});
