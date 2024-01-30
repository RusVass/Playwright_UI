import { Page, Response } from "@playwright/test";

export class ProfilePage{
   // page: Page
    constructor(private page: Page) {
        this.page = page
    }
    readonly buttonEditProfile = this.page.locator('button.btn-primary',{hasText: 'Edit profile'})

    readonly buttonSave = this.page.locator('button', {hasText: 'Save'})
    readonly successPopup = this.page.locator(".alert-success")
   //  open ():Promise<null|Response>{
   //    return this.page.goto('/panel/profile')
   // }
    async open ():Promise<void>{
        await this.page.goto('/panel/profile')
    }
   async setInputFiles(filepath: string):Promise<void>{
       await this.page.setInputFiles('input#editProfilePhoto', filepath)

    }



}
