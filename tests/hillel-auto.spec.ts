import { expect, test } from '@playwright/test';
import { createLandingPageModel } from './pom/landing-page';

function buildRandomEmail(): string {
  return `qa+${Date.now()}@example.com`;
}

function buildRandomPassword(): string {
  return `P@ssword${Math.floor(Math.random() * 1000)}`;
}

test.describe('Landing page onboarding', () => {
  test.skip('створює нового користувача', async ({ page }) => {
    const landingPage = createLandingPageModel(page);
    await landingPage.openLanding();
    await landingPage.openRegistration();

    const payload = {
      firstName: 'Artem',
      lastName: 'Pitt',
      email: buildRandomEmail(),
      password: buildRandomPassword(),
    };

    await landingPage.fillRegistrationForm(payload);
    await expect(landingPage.view.emailInput).toHaveValue(payload.email);

    // landingPage.submitRegistration(); // залишено вимкненим, щоб не створювати зайвих акаунтів
  });
});


