import { test, expect } from '@playwright/test';
import {LandingPage} from "./POM/landingPage";
import {UploadImage} from "./POM/uploadImage";
import {AddCar} from "./POM/addCar";

// const randomNumber=() => {
//        return Math.floor(Math.random() * 1000 + 1)
// }

//test.describe('hillel auto', () =>{

    //     test.skip("creating a new user", async ({ page }) => {
    //     const landingPage = new LandingPage(page)
    //     const password = `${randomNumber()}` + process.env.USER_PASSWORD
    //     const email = `${randomNumber()}`  + process.env.USER_EMAIL
    //
    //     await test.step("open main web page", async () => {
    //     await landingPage.open();
    //     await expect(page).toHaveURL("https://qauto.forstudy.space/");
    //     });
    //
    //     await test.step("click on button Sign in modal window", async () => {
    //     await landingPage.clickSignInButton.click()
    //     });
    //
    //     await test.step("open Registration modal window", async () => {
    //     await landingPage.clickByRegistration.click();
    //     });
    //
    //     await test.step("filling data", async () => {
    //     await landingPage.inputName.fill(process.env.FIRST_NAME)
    //     await  expect(landingPage.inputName).toHaveValue(process.env.FIRST_NAME)
    //     await landingPage.inputLastName.fill(process.env.LAST_NAME)
    //     await  expect(landingPage.inputLastName).toHaveValue(process.env.LAST_NAME)
    //
    //     await landingPage.emailInput.fill((email))
    //     await landingPage.passwordInput.fill( (password))
    //     await  expect(landingPage.passwordInput).toHaveValue((password))
    //     await landingPage.repeatPasswordInput.fill((password))
    //     await  expect(landingPage.repeatPasswordInput).toHaveValue((password))
    //     });
    //     await test.step("click on Register button", async () => {
    //     await landingPage.clickByRegister.click()
    //     await expect(page.locator('div h1')).toBeVisible()
    //     })
    // })
//         test.skip('upload photo', async ({page, context}) => {
//                 const uploadImage = new UploadImage(page)
//
//                 await uploadImage.open()
//                 await uploadImage.clickSignByButton.click()
//                 await uploadImage.inputUserEmail.fill(process.env.USER_EMAIL)
//                 await uploadImage.inputUserPassword.fill(process.env.USER_PASSWORD)
//
//                 await Promise.all([
//                         await page.locator('button', {hasText: 'Login'}).click(),
//                         page.waitForResponse(resp =>
//                             resp.url().includes(`api/auth/signin`)
//                         ),
//                 ])
//
//                 await uploadImage.openProfile()
//                // await page.waitForTimeout(2000)
//                 await uploadImage.clickEditProfileButton.click()
//                // await page.waitForLoadState()
//                 await page.setInputFiles('input#editProfilePhoto', 'fixtures/logo.jpg')
//                 await page.locator('button', {hasText: 'Save'}).click()
//
//         })
// })
   /* test.describe("Garage page tests", () => {
        test.skip('add car', async ({page, context}) => {
                const addCar = new AddCar(page)
                const carBrand = "Porsche";
                const carModel = "Panamera";
                const randomNumber = () => Math.floor(Math.random() * 1000 + 1);

            await test.step("adding a car to the garage", async () => {
                await addCar.open()
                await addCar.clickSignByButton.click()
                await addCar.inputUserEmail.fill(process.env.USER_EMAIL)
                await addCar.inputUserPassword.fill(process.env.USER_PASSWORD)

                await Promise.all([
                        await page.locator('button', {hasText: 'Login'}).click(),
                        page.waitForResponse(resp =>
                            resp.url().includes(`api/auth/signin`)
                        ),
                ])

                await addCar.openGarage()
                await addCar.clickAddCarButton.click()
                await page.locator('select[name="carBrandId"]').click()
                await addCar.brandDropdown.selectOption(carBrand);
                await addCar.modelDropdown.selectOption(carModel);
                await addCar.mileageInput.fill(randomNumber().toString());
                await addCar.addButton.click();
                await expect(addCar.carListItem.first()).toContainText(`${carBrand} ${carModel}`)
                

        })

        /!*    await test.step("adding the fuel expense", async () => {
                await addCar.addFuelExpenseButton.first().click();
                const liters = randomNumber();
                const cost = randomNumber();

                await addCar.numberOfLiters.fill(liters.toString());
                await addCar.totalCost.fill(cost.toString());

                await addCar.mileageInput.click();
                await page.keyboard.press("ArrowUp");

                await addCar.addButton.click();

                // await expect(page.locator("tbody > tr")).toContainText(
                //     `${liters}L${cost}.00 USD`);
        })*!/
    })
})

*/
















