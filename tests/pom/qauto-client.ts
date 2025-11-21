import type { Page } from '@playwright/test';

interface UserCredentials {
  readonly email: string;
  readonly password: string;
}

function buildQautoUrl(path: string = '/'): string {
  const baseUrl = process.env.QAUTO_BASE_URL ?? 'https://qauto.forstudy.space/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  if (!path || path === '/') {
    return normalizedBase;
  }
  return `${normalizedBase}${path.startsWith('/') ? path.slice(1) : path}`;
}

function resolveRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Середовище ${key} не задане, але є обов'язковим для тесту`);
  }
  return value;
}

function readUserCredentials(overrides: Partial<UserCredentials> = {}): UserCredentials {
  return {
    email: overrides.email ?? resolveRequiredEnv('USER_EMAIL'),
    password: overrides.password ?? resolveRequiredEnv('USER_PASSWORD'),
  };
}

async function loginToQauto(page: Page, overrides: Partial<UserCredentials> = {}): Promise<void> {
  const credentials = readUserCredentials(overrides);

  await page.goto(buildQautoUrl('/panel/garage'));
  const logoutControl = page.getByText(/log out/i).first();
  if ((await logoutControl.count()) > 0 && (await logoutControl.isVisible().catch(() => false))) {
    return;
  }

  await page.goto(buildQautoUrl('/'));
  const signInButton = page.getByRole('button', { name: /sign in/i });
  await signInButton.click();
  await page.locator('input#signinEmail').fill(credentials.email);
  await page.locator('input#signinPassword').fill(credentials.password);

  await Promise.all([
    page.getByRole('button', { name: /login/i }).click(),
    page.waitForResponse((resp) => resp.url().includes('/api/auth/signin')),
  ]);

  await page.waitForURL(/panel\/garage/, { timeout: 15_000 });
}

export { buildQautoUrl, loginToQauto, readUserCredentials };
export type { UserCredentials };


