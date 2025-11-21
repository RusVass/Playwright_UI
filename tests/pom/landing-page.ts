import type { Locator, Page } from '@playwright/test';
import { buildQautoUrl } from './qauto-client';

interface RegistrationPayload {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
}

interface LandingPageModel {
  readonly openLanding: () => Promise<void>;
  readonly openRegistration: () => Promise<void>;
  readonly fillRegistrationForm: (payload: RegistrationPayload) => Promise<void>;
  readonly submitRegistration: () => Promise<void>;
  readonly view: {
    readonly signInButton: Locator;
    readonly registrationButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly repeatPasswordInput: Locator;
    readonly registerButton: Locator;
  };
}

function createLandingPageModel(page: Page): LandingPageModel {
  const signInButton = page.getByRole('button', { name: /sign in/i });
  const registrationButton = page.getByRole('button', { name: /registration/i });
  const firstNameInput = page.locator('#signupName');
  const lastNameInput = page.locator('#signupLastName');
  const emailInput = page.locator('#signupEmail');
  const passwordInput = page.locator('#signupPassword');
  const repeatPasswordInput = page.locator('#signupRepeatPassword');
  const registerButton = page.getByRole('button', { name: /register/i });

  async function openLanding(): Promise<void> {
    await page.goto(buildQautoUrl('/'));
  }

  async function openRegistration(): Promise<void> {
    await signInButton.click();
    await registrationButton.click();
  }

  async function fillRegistrationForm(payload: RegistrationPayload): Promise<void> {
    await firstNameInput.fill(payload.firstName);
    await lastNameInput.fill(payload.lastName);
    await emailInput.fill(payload.email);
    await passwordInput.fill(payload.password);
    await repeatPasswordInput.fill(payload.password);
  }

  async function submitRegistration(): Promise<void> {
    await registerButton.click();
  }

  return {
    openLanding,
    openRegistration,
    fillRegistrationForm,
    submitRegistration,
    view: {
      signInButton,
      registrationButton,
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      repeatPasswordInput,
      registerButton,
    },
  };
}

export { createLandingPageModel };
export type { LandingPageModel, RegistrationPayload };


