import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const STORAGE_STATE = path.resolve(process.cwd(), 'playwright/.auth/user.json');

const httpCredentials = (() => {
  if (!process.env.QAUTO_BASIC_AUTH) {
    return undefined;
  }
  const [username = '', ...rest] = process.env.QAUTO_BASIC_AUTH.split(':');
  return {
    username,
    password: rest.join(':'),
  };
})();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  timeout: 90_000,
  expect: {
    timeout: 10_000,
  },
  globalSetup: './global-setup.ts',
  use: {
    baseURL: process.env.QAUTO_BASE_URL ?? 'https://qauto.forstudy.space/',
    storageState: STORAGE_STATE,
    httpCredentials,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retry-with-video',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});

