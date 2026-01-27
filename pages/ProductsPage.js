const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
    }

    #titleLocator() {
        return this.page.locator('.title');
    }

    #inventoryItemsLocator() {
        return this.page.locator('.inventory_item');
    }

    #shoppingCartBadgeLocator() {
        return this.page.locator('.shopping_cart_badge');
    }

    #shoppingCartLinkLocator() {
        return this.page.locator('.shopping_cart_link');
    }

    async getInventoryItemCount() {
        return await this.#inventoryItemsLocator().count();
    }

    async verifyProductsPageVisible() {
        await expect(this.#titleLocator()).toBeVisible();
    }

    async getAllProducts() {
        const products = await this.#inventoryItemsLocator().all();
        const productList = [];
        for (const item of products) {
            const name = await item.locator('.inventory_item_name').innerText();
            const price = await item.locator('.inventory_item_price').innerText();
            productList.push({ name, price });
        }
        return productList;
    }

    async addProductToCart(index = 0) {
        const items = await this.#inventoryItemsLocator().all();
        const addButton = items[index].locator('button[id^="add-to-cart"]');
        await addButton.click();
    }

    async addMultipleProducts(count) {
        const items = await this.#inventoryItemsLocator().all();
        for (let i = 0; i < count; i++) {
            const addButton = items[i].locator('button[id^="add-to-cart"]');
            await addButton.click();
        }
    }


    async getCartQuantity() {
        if (await this.#shoppingCartBadgeLocator().isVisible()) {
            return await this.#shoppingCartBadgeLocator().innerText();
        }
        return '0';
    }

    async goToCart() {
        await this.#shoppingCartLinkLocator().click();
    }
}

module.exports = ProductsPage;
