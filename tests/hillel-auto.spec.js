import { test, expect } from '@playwright/test';

test.describe('hillel auto', () =>{
    test('Should register', async ({page})=>{
        const emailInput = page.locator('#signupEmail')
        const passwordInput = page.locator('#signupPassword')
        const repeatPasswordInput = page.locator('#signupRepeatPassword')
        const password = Math.floor(Math.random() * 100 + 1) + process.env.USER_PASSWORD
        const email = Math.floor(Math.random() * 100 + 1) + process.env.USER_EMAIL

        await page.goto('')
        await expect(page).toHaveURL("https://qauto.forstudy.space/")
        await page.locator('button.btn-primary').click()
        await page.locator('#signupName').fill(process.env.FIRST_NAME)
        await  expect(page.locator('#signupName')).toHaveValue(process.env.FIRST_NAME)
        await page.locator('#signupLastName').fill(process.env.LAST_NAME)
        await  expect(page.locator('#signupLastName')).toHaveValue(process.env.LAST_NAME)
        await emailInput.fill((email))
        await passwordInput.fill( (password))
        await  expect(passwordInput).toHaveValue((password))
        await repeatPasswordInput.fill((password))
        await  expect(repeatPasswordInput).toHaveValue((password))
        await page.locator('Button', {hasText: "Register"}).click()
        await page.getByRole("link", { name: "Garage", exact: true })
        await page.locator("#userNavDropdown")
        await expect(page.locator("#userNavDropdown")).toBeVisible()
    })
})

