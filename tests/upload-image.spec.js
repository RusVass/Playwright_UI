import { test, expect } from '@playwright/test'

test.skip('test', async ({ page }) => {
    await page.goto('/panel/profile')
    await page.locator('button',{ name: "Edit profile" }) //{hasText: 'Edit profile'}).click()
    await page.setInputFiles('input#editProfilePhoto', 'fixtures/logo.jpg')
    await setTimeout(10000)
    await page.locator('button', {name: 'Save'}).click()
})