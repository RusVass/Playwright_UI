
export class LandingPage{
    constructor(page) {
        this.page = page
        this.emailInput = page.locator('#signupEmail')
        this.signInButton = page.locator('button.btn-primary')
        this.inputSignupName = page.locator('#signupName')
        this.inputSignupLastName = page.locator('#signupLastName')
        this.passwordInput = page.locator('input[name="password"]')
        this.repeatPasswordInput = page.locator('input[name="repeatPassword"]')
        this.clickbyRegister = page.locator('button', {hasText: "Register"})
    }

   async open(){
        await  this.page.goto("https://@qauto.forstudy.space/")
    }
    // open(){
    //     return  this.page.goto("https://@qauto.forstudy.space/")
    // }

}