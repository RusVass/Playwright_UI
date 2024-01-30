import { type Page, type Locator } from "@playwright/test";

export class ProfilePage{
    readonly buttonEditProfile: Locator
    readonly buttonSave: Locator
    readonly successPopup: Locator
    constructor(private page: Page) {
        this.page = page
        this.buttonEditProfile = this.page.locator('button.btn-primary',{hasText: 'Edit profile'})
        this.buttonSave = this.page.locator('button', {hasText: 'Save'})
        this.successPopup = this.page.locator(".alert-success")

    }
    async open ():Promise<void>{
        await this.page.goto('/panel/profile')
    }
   async setInputFiles(filepath: string):Promise<void>{
       await this.page.setInputFiles('input#editProfilePhoto', filepath)

    }
}
