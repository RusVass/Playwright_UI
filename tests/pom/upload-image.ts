import type { Locator, Page } from '@playwright/test';
import { buildQautoUrl, loginToQauto } from './qauto-client';

interface UploadImageModel {
  readonly ensureAuthenticated: () => Promise<void>;
  readonly openProfile: () => Promise<void>;
  readonly uploadPhoto: (filePath: string) => Promise<void>;
  readonly view: {
    readonly editProfileButton: Locator;
    readonly photoInput: Locator;
    readonly saveButton: Locator;
  };
}

function createUploadImageModel(page: Page): UploadImageModel {
  const editProfileButton = page.getByRole('button', { name: /edit profile/i });
  const photoInput = page.locator('input#editProfilePhoto');
  const saveButton = page.getByRole('button', { name: /save/i });

  async function ensureAuthenticated(): Promise<void> {
    await loginToQauto(page);
  }

  async function openProfile(): Promise<void> {
    await page.goto(buildQautoUrl('/panel/profile'));
    await page.waitForLoadState('domcontentloaded');
  }

  async function uploadPhoto(filePath: string): Promise<void> {
    await editProfileButton.click();
    await photoInput.setInputFiles(filePath);
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/users/profile') && resp.request().method() === 'PUT',
    );
    await saveButton.click();
    const response = await responsePromise;
    if (!response.ok()) {
      throw new Error('Не вдалося зберегти змінену аватарку');
    }
  }

  return {
    ensureAuthenticated,
    openProfile,
    uploadPhoto,
    view: {
      editProfileButton,
      photoInput,
      saveButton,
    },
  };
}

export { createUploadImageModel };
export type { UploadImageModel };

