const { setWorldConstructor, World } = require('@cucumber/cucumber');
const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');
const CartPage = require('../../pages/CartPage');


class CustomWorld extends World {
    constructor(options) {
        super(options);
        this.page = undefined;
        this.context = undefined;
        this.expectedCount = 0;
    }

    get loginPage() {
        return new LoginPage(this.page);
    }

    get productsPage() {
        return new ProductsPage(this.page);
    }

    get cartPage() {
        return new CartPage(this.page);
    }
}

setWorldConstructor(CustomWorld);

module.exports = CustomWorld;
