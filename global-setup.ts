import { chromium, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs/promises';
import dotenv from 'dotenv';

import { STORAGE_STATE } from './playwright.config';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

function buildSecureUrl(pathname: string): string {
  const base = process.env.QAUTO_BASE_URL ?? 'https://qauto.forstudy.space/';
  const url = new URL(pathname, base);

  return url.toString();
}

function buildBasicAuthHeader(): Record<string, string> {
  if (!process.env.QAUTO_BASIC_AUTH) {
    return {};
  }
  const token = Buffer.from(process.env.QAUTO_BASIC_AUTH, 'utf8').toString('base64');
  return {
    Authorization: `Basic ${token}`,
  };
}

async function globalSetup(): Promise<void> {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const response = await page.request.post(buildSecureUrl('/api/auth/signin'), {
    headers: {
      'content-type': 'application/json',
      ...buildBasicAuthHeader(),
    },
    data: {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
      remember: false,
    },
  });

  const payload = await response.json();
  expect(payload.status).toEqual('ok');

  await fs.mkdir(path.dirname(STORAGE_STATE), { recursive: true });

  await page.context().storageState({ path: STORAGE_STATE });
  await browser.close();
}

export default globalSetup;

