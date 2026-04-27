import { defineConfig, devices } from '@playwright/test';

const isWindows = process.platform === 'win32';
const serverCommand = isWindows
  ? 'node "C:\\\\Program Files\\\\nodejs\\\\node_modules\\\\npm\\\\bin\\\\npm-cli.js" run build && node "C:\\\\Program Files\\\\nodejs\\\\node_modules\\\\npm\\\\bin\\\\npm-cli.js" run start -- -p 3000'
  : 'npm run build && npm run start -- -p 3000';

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: serverCommand,
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
