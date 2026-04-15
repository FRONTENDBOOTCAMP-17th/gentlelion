import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'user',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:5173',
      },
      testMatch: 'tests/user/**/*.spec.js',
    },
    {
      name: 'admin',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:5174',
      },
      testMatch: 'tests/admin/**/*.spec.js',
    },
  ],

  webServer: [
    {
      command: 'npm run dev:user',
      url: 'http://localhost:5173',
      reuseExistingServer: true,
    },
    {
      command: 'npm run dev:admin',
      url: 'http://localhost:5174',
      reuseExistingServer: true,
    },
  ],
});