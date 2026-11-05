const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  timeout: 30000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  // Démarre l'application avant les tests (PostgreSQL doit être lancé).
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000/login.html',
    reuseExistingServer: true,
    timeout: 30000,
  },
});
