import { test, expect } from '@playwright/test'
import { ProfilePage } from "./POM/profile.page";
test.describe("Profile-page test", () => {
    test('test', async ({page}) => {
        const profilePage = new ProfilePage(page)

        await profilePage.open()
        await profilePage.buttonEditProfile.click()
        await profilePage.setInputFiles('fixtures/logo.jpg')
        await profilePage.buttonSave.click()
        await expect(profilePage.successPopup).toBeVisible()
    })
})



