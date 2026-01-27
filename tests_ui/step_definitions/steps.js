const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const credentials = require('./testData.json');

Given('I open the SauceDemo website', async function () {
    await this.loginPage.navigate();
});

When('I login as a standard user', async function () {
    const { username, password } = credentials.default;
    await this.loginPage.login(username, password);
});

Then('I should see the products page', async function () {
    await this.productsPage.verifyProductsPageVisible();
});

Then('I log all products with their names and prices', async function () {
    const products = await this.productsPage.getAllProducts();
    console.log('--- Product List ---');
    products.forEach(p => console.log(`${p.name}: ${p.price}`));
    console.log('--------------------');
});

When('I add a random number of products to the cart', async function () {
    const itemCount = await this.productsPage.getInventoryItemCount();
    const randomCount = Math.floor(Math.random() * itemCount) + 1;

    this.expectedCount = randomCount;
    this.attach(`Adding ${randomCount} random products to cart`);
    await this.productsPage.addMultipleProducts(randomCount);
});

Then('the cart quantity should be {string}', async function (expectedQty) {
    let actualQty = await this.productsPage.getCartQuantity();
    expect(actualQty).toBe(expectedQty);
});

Then('the cart quantity should match the expected number of products', async function () {
    let actualQty = await this.productsPage.getCartQuantity();
    expect(actualQty).toBe(this.expectedCount.toString());
});

Then('I go to the cart page', async function () {
    await this.productsPage.goToCart();
});

Then('I verify the quantity and description are visible', async function () {
    await this.cartPage.verifyItemsVisible();
});

Then('I verify remove, checkout, and continue buttons are enabled', async function () {
    await this.cartPage.verifyButtonsEnabled();
});

When('I remove a random number of products from the cart', async function () {
    const itemCount = await this.cartPage.getCartItemCount();
    const randomCount = Math.floor(Math.random() * itemCount) + 1;

    this.expectedCount -= randomCount;
    this.attach(`Removing ${randomCount} random products from cart`);
    await this.cartPage.removeMultipleProducts(randomCount);
});
