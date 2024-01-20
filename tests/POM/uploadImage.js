export class UploadImage{
    constructor(page) {
        this.page = page
        this.inputByPhoto = page.locator('input[name="photo"]');
        this.clickEditProfileButton = page.locator('button.btn-primary',{hasText: 'Edit profile'})
        this.clicSave = page.locator('button', {hasText: 'Save'})

    }
    openProfile(){
       return  this.page.goto('/panel/profile')
    }
}
