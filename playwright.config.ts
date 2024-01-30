import {  defineConfig, devices } from '@playwright/test'
import path from 'path'

require('dotenv').config()

export const STORAGE_STATE = path.join(__dirname, 'states/.auth/user.json')

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
/* Maximum time one test can run for. */
timeout: 30 * 1000,
    expect: {
  /**
  * Maximum time expect() should wait for the condition to be met.
  * For example in `await expect(locator).toHaveText();`
  */
  timeout: 5000
},
  // testMatch: '*.cy.js',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: `https://${process.env.AUTHENTICATION_NAME}:${process.env.AUTHENTICATION_PASSWORD}@qauto.forstudy.space`,
    baseURL: 'https://qauto.forstudy.space',
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 5000,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    httpCredentials: {
      username: `${process.env.AUTHENTICATION_NAME}`,
      password: `${process.env.AUTHENTICATION_PASSWORD}`,
    },
    //video: 'retain-on-failure'
    screenshot: 'only-on-failure'
  },
 // globalSetup: path.join(__dirname, 'global-setup.js'), // опція 2

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup', // опція 1
      testMatch: /global-setup\.js/, // опція 1
    },

    {
      name: 'chromium', // опція 1/2
       dependencies: ['setup'], // опція 1
      use: {
        ...devices['Desktop Chrome'], // опція 1/2
        storageState: STORAGE_STATE, // опція 1/2
      },
    },

     {
       name: 'firefox', // опція 1/2
       dependencies: ['setup'], // опція 1
       use: {
         ...devices['Desktop Firefox'] , // опція 1/2
       storageState: STORAGE_STATE, // опція 1/2
     },
     },

    {
      name: 'webkit',
      dependencies: ['setup'], // опція 1
      use: { ...devices['Desktop Safari'] , // опція 1/2
      storageState: STORAGE_STATE, // опція 1/2
      },
     },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
























