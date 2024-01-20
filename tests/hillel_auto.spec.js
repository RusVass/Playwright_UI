/*
import { test, expect } from '@playwright/test'
import {LandingPage} from "./POMS/landingPage";


const randomNumber=() => {
    return Math.floor(Math.random() * 100 + 1)
}
test.describe('Hillel auto', () => {

    test('Should register', async ({page}) => {
        const landingPage = new LandingPage(page)

       // const emailInput = page.locator('#signupEmail')
        //const passwordInput = page.locator('input[name="password"]')
       // const repeatPasswordInput = page.locator('input[name="repeatPassword"]')
       // await page.goto("https://@qauto.forstudy.space/")
        await landingPage.open()
       // await page.locator('button.btn-primary').click()
        await landingPage.signInButton.click()

       // await page.getByRole("button", { name: "Sign In" }).click()
        //await page.locator('#signupName').fill('Artem')
        await landingPage.inputSignupName.fill('Artem')
        await expect(landingPage.inputSignupName).toHaveValue('Artem')
        await  landingPage.inputSignupLastName.fill('Pitt')
        await expect(landingPage.inputSignupLastName).toHaveValue('Pitt')
       // await page.locator('#signupLastName').fill('Pitt')
        //await emailInput.fill(`test+${randomNumber()}@test.com`) //('test+321321312@test.com')
        //await expect(emailInput).toHaveValue(`test+${randomNumber()}@test.com`)
        await landingPage.emailInput.fill(`test+${randomNumber()}@test.com`)
        await landingPage.passwordInput.fill('P@ssword1')
        await landingPage.repeatPasswordInput.fill('P@ssword1')
       // await page.locator('button', {hasText: "Register"}).click()
        await  landingPage.clickbyRegister.click()

        // await page.locator('button:text("Register")').click()// метод якщо є вкладення
        //await page.getByText('Register', {exact: true}).click()// знайде конкретний текс
    })

    test.skip('Should open instruction', async ({page, context}) => {
        await page.goto('https://qauto.forstudy.space/')
        await page.locator('button', {hasText: 'Sign in'}).click()
        await page.locator('input#signinEmail').fill(process.env.USER_EMAIL)
        await page.locator('input#signinPassword').fill(process.env.USER_PASSWORD)
       // await page.waitForLoadState()
        //await page.locator('button', {hasText: 'Login'}).click()
        //await page.waitForLoadState()

       // const instructionPage = await context.waitForEvent('page')
        await Promise.all([
            await page.locator('button', {hasText: 'Login'}).click(),
            page.waitForResponse(resp =>
                resp.url().includes(`api/auth/signin`)
            ),
        ])
        await page.goto('/panel/profile')
        await page.waitForTimeout(5000)
        await page.locator('button.btn-primary',{hasText: 'Edit profile'}).click()
        await page.waitForLoadState()
        await page.setInputFiles('input#editProfilePhoto', 'fixtures/logo.jpg')
        //await page.waitForLoadState()
        //await page.waitForTimeout(2000)
        await page.locator('button', {hasText: 'Save'}).click()

        // await Promise.all([
        //     await page.locator('button', {hasText: 'Save'}).click(),
        //   page.waitForResponse(resp =>
        //     resp.url().includes(`api/users/profile`)
        //   ),
        // ])



// приклад дочікуватись завантаження даних через Promise.all
        // await Promise.all([
        //   page.locator('button', {hasText: 'Login'}).click(),
        //   page.waitForResponse(resp =>
        //     resp.url().includes(`/api/cars`)
        //   ),
        // ])
        // приклад дочікуватись завантаження даних через waitForLoadState()
        // await page.waitForLoadState()
        // await page.locator('a[routerlink="instructions"]').click()
        // await page.locator('.instructions_content a').nth(0).click()
        // const instructionPage = await context.waitForEvent('page')
        // //await page.waitForTimeout(5000)
        // //await page.waitForLoadState()
        // await expect(instructionPage.locator('body')).toContainText("")
    })
      // ========робота з двома вкладками ======
    test.skip('Should open hillel site', async ({page, context}) => {
        await page.goto('https://qauto.forstudy.space/')
        await page.locator('a[href="https://ithillel.ua"]').click()
        const hillelPage = await context.waitForEvent('page') // робота з двома вкладками
        await hillelPage.locator('.section-content_descriptor') // робота з двома вкладками
        //await expect(hillelPage.locator('.section-content_descriptor')).toHaveText('Вдосконалюйся!')
       // await page.locator('button.btn-primary').click() // у пешій вуладці відкриваємо селектор
        await hillelPage.waitForTimeout(2000)
        await hillelPage.locator('button#btn-consultation-hero').click()
        //await page.locator('button', {hasText: 'Sign in'}).click()
        await page.pause()
    })
})
*/
