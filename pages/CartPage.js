const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.cartItems = this.page.locator('.cart_item');
        this.removeButton = this.page.locator('button[id^="remove-"]').first();
        this.checkoutButton = this.page.locator('#checkout');
        this.continueShoppingButton = this.page.locator('#continue-shopping');
    }

    async getCartItemCount() {
        return await this.cartItems.count();
    }

    async verifyItemsVisible() {
        const count = await this.cartItems.count();
        expect(count).toBeGreaterThan(0);
    }

    async verifyButtonsEnabled() {
        await expect(this.removeButton).toBeEnabled();
        await expect(this.checkoutButton).toBeEnabled();
        await expect(this.continueShoppingButton).toBeEnabled();
    }

    async removeProduct() {
        await this.removeButton.click();
    }

    async removeMultipleProducts(count) {
        for (let i = 0; i < count; i++) {
            await this.removeButton.click();
        }
    }

}

module.exports = CartPage;
