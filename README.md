# Playwright_UI

## Overview
A collection of Playwright end-to-end and API tests that validate the Qauto training service. The repository highlights a Page Object approach, shared page models, and a global setup that persists the authenticated `storageState`.

## Features
- API login with reusable browser sessions.
- Garage CRUD flows: add car and log fuel expenses.
- Profile avatar update with network response validation.
- Sample UI registration flow (skipped to avoid spam accounts).
- Dedicated POM modules under `tests/pom` with typed interfaces and locators.

## Structure
- `tests/*.spec.*` – UI and API test suites.
- `tests/pom/` – page models: `add-car`, `upload-image`, `landing-page`, `qauto-client`.
- `global-setup.ts` – API login plus generation of `playwright/.auth/user.json`.
- `fixtures/` – assets for uploads.
- `playwright.config.ts` – shared browser, trace, and reporter settings.

## Setup
1. Install Node.js 20+ and npm.
2. Create a `.env` file in the project root:
   ```
   USER_EMAIL=qa@example.com
   USER_PASSWORD=secret
   QAUTO_BASE_URL=https://qauto.forstudy.space/
   # optional basic HTTP auth
   QAUTO_BASIC_AUTH=username:password
   ```
3. Install dependencies: `npm install`.
4. (Optional) replace assets under `fixtures/` with your own files.

## Running Tests
- `npm run test` – Playwright UI+API suite in headless mode.
- `npm run test:headed` – the same suite with a visible browser.
- `npm run test:debug` – launches Playwright Inspector for step-by-step debugging.
- `npm run test:spec` – only `tests/add-car.spec.ts`.
- `npm run test:global-setup` – executes the global setup in isolation.
- Direct command examples (if you prefer `npx`):
  - Full suite: `npx playwright test`.
  - Single spec: `npx playwright test tests/add-car.spec.ts`.
  - Headed/debug mode: `npx playwright test --debug`.
  - Refresh global state manually: `npx playwright test --global-setup ./global-setup.ts`.

## Notes
- Reports and traces live in `playwright-report/` and `test-results/`.
- For CI set `USER_EMAIL`, `USER_PASSWORD`, `QAUTO_BASE_URL`, and `CI=1` to enable retries.