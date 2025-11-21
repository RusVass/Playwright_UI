import { expect, test } from '@playwright/test';
import { createAddCarModel } from './pom/add-car';
import { buildQautoUrl } from './pom/qauto-client';

function randomInt(max: number = 1000): number {
  return Math.floor(Math.random() * max + 1);
}

const missingCredentials = !process.env.USER_EMAIL || !process.env.USER_PASSWORD;

test.describe('Garage page', () => {
  test.skip(missingCredentials, 'USER_EMAIL та USER_PASSWORD обовʼязкові для цього сценарію');

  test('adds car and fuel expense', async ({ page }) => {
    const addCar = createAddCarModel(page);
    const brand = 'Porsche';
    const model = 'Panamera';

    await test.step('автентифікація та перехід у гараж', async () => {
      await addCar.ensureAuthenticated();
      await addCar.openGarage();
      await expect(page).toHaveURL(buildQautoUrl('/panel/garage'));
    });

    await test.step('додаю авто до гаражу', async () => {
      await addCar.addCar({
        brand,
        model,
        mileage: randomInt(),
      });
      await expect(addCar.view.carCards.first()).toContainText(`${brand} ${model}`);
    });

    await test.step('фіксую витрати на пальне', async () => {
      const liters = randomInt();
      const cost = randomInt();
      await addCar.addFuelExpense({
        liters,
        cost,
        mileageDelta: 1,
      });
      await expect(addCar.view.fuelRows.first()).toContainText(`${liters}`);
    });
  });
});

