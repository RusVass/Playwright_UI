import { test, expect } from '@playwright/test';

test.skip('test', async ({page, context}) => {
    await page.goto('/')
    await page.pause()
})