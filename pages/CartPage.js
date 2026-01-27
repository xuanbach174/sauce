const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class CartPage extends BasePage {
    constructor(page) {
        super(page);
    }

    #cartItemsLocator() {
        return this.page.locator('.cart_item');
    }

    #removeButtonLocator() {
        return this.page.locator('button[id^="remove-"]').first();
    }

    #checkoutButtonLocator() {
        return this.page.locator('#checkout');
    }

    #continueShoppingButtonLocator() {
        return this.page.locator('#continue-shopping');
    }

    async getCartItemCount() {
        return await this.#cartItemsLocator().count();
    }

    async verifyItemsVisible() {
        const count = await this.#cartItemsLocator().count();
        expect(count).toBeGreaterThan(0);
    }

    async verifyButtonsEnabled() {
        await expect(this.#removeButtonLocator()).toBeEnabled();
        await expect(this.#checkoutButtonLocator()).toBeEnabled();
        await expect(this.#continueShoppingButtonLocator()).toBeEnabled();
    }

    async removeProduct() {
        await this.#removeButtonLocator().click();
    }

    async removeMultipleProducts(count) {
        for (let i = 0; i < count; i++) {
            await this.#removeButtonLocator().click();
        }
    }

}

module.exports = CartPage;
