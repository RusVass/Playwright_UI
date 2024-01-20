import { chromium, expect } from '@playwright/test';
import { STORAGE_STATE } from "./playwright.config";

const { defineConfig, devices } = require('@playwright/test');

async function globalSetup( config) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const response = await page.request.post('https://qauto.forstudy.space/api/auth/signin', {
        data: {
            "email": process.env.USER_EMAIL,
            "password": process.env.USER_PASSWORD,
            "remember": false
        }
    })
    const resp = await response.json()

    expect(resp.status).toEqual('ok')
   // await page.context().storageState({ path: 'playwright/.auth/user.json'})
    await page.context().storageState({ path: STORAGE_STATE });
    await browser.close();
}

export default globalSetup;












