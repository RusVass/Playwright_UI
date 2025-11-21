import { expect, test } from '@playwright/test';
import { createUploadImageModel } from './pom/upload-image';

const missingCredentials = !process.env.USER_EMAIL || !process.env.USER_PASSWORD;

test.describe('Profile avatar upload', () => {
  test.skip(missingCredentials, 'USER_EMAIL та USER_PASSWORD обовʼязкові для цього сценарію');

  test('оновлює фото користувача', async ({ page }) => {
    const uploadImage = createUploadImageModel(page);

    await test.step('вхід у профіль', async () => {
      await uploadImage.ensureAuthenticated();
      await uploadImage.openProfile();
      await expect(uploadImage.view.editProfileButton).toBeVisible();
    });

    await test.step('завантаження файлу', async () => {
      await uploadImage.uploadPhoto('fixtures/logo.jpg');
      await expect(uploadImage.view.photoInput).toBeVisible();
    });
  });
});
