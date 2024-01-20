import { test, expect } from '@playwright/test';

import {UploadImage} from "./POM/uploadImage";
test.describe('hillel upload image', () =>{
    test.only('test upload photo', async ({page, context}) => {
        const uploadImage = new UploadImage(page)
        await uploadImage.openProfile()
        await uploadImage.clickEditProfileButton.click()
        await page.setInputFiles('input#editProfilePhoto', 'fixtures/photo.png')
        await uploadImage.clicSave.click
        await expect(uploadImage.inputByPhoto).toBeVisible();
    })
})
























