// scripts/wait-for-url.js
import https from 'https';

const url = process.argv[2];
const maxAttempts = 30;
const delayMs = 2000;

if (!url) {
  console.error('❌ Не передан URL для проверки');
  process.exit(1);
}

function checkUrl(url) {
  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        resolve(res.statusCode >= 200 && res.statusCode < 400);
      })
      .on('error', () => resolve(false));
  });
}

(async () => {
  for (let i = 0; i < maxAttempts; i++) {
    const isUp = await checkUrl(url);
    if (isUp) {
      console.log(`✅ URL доступен: ${url}`);
      process.exit(0);
    }
    console.log(`⏳ Ожидание (${i + 1}/${maxAttempts})...`);
    await new Promise((res) => setTimeout(res, delayMs));
  }

  console.error(`❌ URL не стал доступен за ${(maxAttempts * delayMs) / 1000} секунд: ${url}`);
  process.exit(1);
})();
