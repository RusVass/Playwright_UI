import type { Locator, Page } from '@playwright/test';
import { buildQautoUrl, loginToQauto } from './qauto-client';

interface CarDetails {
  readonly brand: string;
  readonly model: string;
  readonly mileage: number;
}

interface FuelExpense {
  readonly liters: number;
  readonly cost: number;
  readonly mileageDelta?: number;
}

interface AddCarModel {
  readonly openGarage: () => Promise<void>;
  readonly ensureAuthenticated: () => Promise<void>;
  readonly addCar: (details: CarDetails) => Promise<void>;
  readonly addFuelExpense: (expense: FuelExpense) => Promise<void>;
  readonly view: {
    readonly carCards: Locator;
    readonly fuelRows: Locator;
  };
}

function createAddCarModel(page: Page): AddCarModel {
  const addCarButton = page.getByRole('button', { name: /add car/i });
  const brandDropdown = page.locator('select[name="carBrandId"]');
  const modelDropdown = page.locator('select[name="carModelId"]');
  const mileageInput = page.locator('input[name="mileage"]');
  const submitButton = page.getByRole('button', { name: /^add$/i });
  const carCards = page.locator('app-car, .car');

  const addFuelExpenseButton = page.getByRole('button', { name: /add fuel expense/i });
  const litersInput = page.locator('input[name="liters"]');
  const totalCostInput = page.locator('input[name="totalCost"]');
  const fuelRows = page.locator('tbody > tr');

  async function ensureAuthenticated(): Promise<void> {
    await loginToQauto(page);
  }

  async function openGarage(): Promise<void> {
    await page.goto(buildQautoUrl('/panel/garage'));
    await page.waitForLoadState('domcontentloaded');
  }

  async function addCar(details: CarDetails): Promise<void> {
    await addCarButton.click();
    await brandDropdown.click();
    await brandDropdown.selectOption({ label: details.brand });
    await modelDropdown.selectOption({ label: details.model });
    await mileageInput.fill(details.mileage.toString());

    await Promise.all([
      submitButton.click(),
      page.waitForResponse((resp) => resp.url().includes('/api/cars') && resp.request().method() === 'POST'),
    ]);
  }

  async function addFuelExpense(expense: FuelExpense): Promise<void> {
    await addFuelExpenseButton.first().click();
    await litersInput.fill(expense.liters.toString());
    await totalCostInput.fill(expense.cost.toString());

    if (expense.mileageDelta && expense.mileageDelta !== 0) {
      await mileageInput.click();
      const presses = Math.abs(expense.mileageDelta);
      const direction = expense.mileageDelta > 0 ? 'ArrowUp' : 'ArrowDown';
      for (let index = 0; index < presses; index += 1) {
        await page.keyboard.press(direction);
      }
    }

    await Promise.all([
      submitButton.click(),
      page.waitForResponse((resp) => resp.url().includes('/api/expenses') && resp.request().method() === 'POST'),
    ]);
  }

  return {
    openGarage,
    ensureAuthenticated,
    addCar,
    addFuelExpense,
    view: {
      carCards,
      fuelRows,
    },
  };
}

export { createAddCarModel };
export type { AddCarModel, CarDetails, FuelExpense };


