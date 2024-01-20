export class AddCar {
    constructor(page) {
        this.page = page
        this.clickAddCarButton = page.getByRole("button", { name: "Add car" });
        this.carListItem = page.locator(".car-item");

        //car modal
        this.selectBrand = page.getByLabel("Brand");
        this.selectModel = page.getByLabel("Model");
        this.inputMileage = page.getByLabel("Mileage");
        this.clickAddButton = page.getByRole("button", { name: "Add" });
        this.addFuelExpenseButton = page.getByRole("button", {
            name: "Add fuel expense",
        });

        //add an expense modal
        this.liters = page.getByLabel("Number of liters");
        this.cost = page.getByLabel("Total cost");

    }
    openGarage(){
        return  this.page.goto('/panel/garage')
    }

}