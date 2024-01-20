import { test, expect } from '@playwright/test';
import {AddCar} from "./POM/addCar";

const randomNumber=() => {
       return Math.floor(Math.random() * 1000 + 1)
}
test.describe("Garage page tests", () => {
     test('add car', async ({page, context}) => {
             const addCar = new AddCar(page)
             const brand = "Porsche";
             const model = "Panamera";
             const randomNumber = () => Math.floor(Math.random() * 1000 + 1);

         await test.step("open the garage page", async () => {
             await addCar.openGarage()
            await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");
         });

         await test.step("add car ", async () => {
             await addCar.clickAddCarButton.click()
             await page.locator('select[name="carBrandId"]').click()
             await addCar.selectBrand.selectOption(brand);
             await addCar.selectModel.selectOption(model);
             await addCar.inputMileage.fill(randomNumber().toString());
             await addCar.clickAddButton.click();
             await expect(addCar.carListItem.first()).toContainText(`${brand} ${model}`)
     })

          await test.step("add fuel expense", async () => {
             await addCar.addFuelExpenseButton.first().click();
             const liters = randomNumber();
             const cost = randomNumber();
             await addCar.liters.fill(liters.toString());
             await addCar.cost.fill(cost.toString());
             await addCar.inputMileage.click();
             await page.keyboard.press("ArrowUp");
             await addCar.clickAddButton.click();
             await expect(page.locator("tbody > tr")).toContainText(`${liters}L${cost}`);
      })
  })
})









