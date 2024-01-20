

export class LandingPage{
    constructor(page) {
        this.page = page
        this.emailInput = page.locator('#signupEmail')
        this.passwordInput = page.locator('#signupPassword')
        this.repeatPasswordInput = page.locator('#signupRepeatPassword')
        this.clickSignInButton = page.getByRole("button", { name: "Sign In" })
        this.clickByRegistration = page.getByRole("button", {name: "Registration",})
        this.inputName = page.locator('#signupName')
        this.inputLastName = page.locator('#signupLastName')
        this.clickByRegister = page.getByText('Register')
    }
      open(){
         return  this.page.goto("https://@qauto.forstudy.space/")
      }

}



