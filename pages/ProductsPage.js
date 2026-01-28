const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
        this.title = this.page.locator('.title');
        this.inventoryItems = this.page.locator('.inventory_item');
        this.shoppingCartBadge = this.page.locator('.shopping_cart_badge');
        this.shoppingCartLink = this.page.locator('.shopping_cart_link');
    }

    async getInventoryItemCount() {
        return await this.inventoryItems.count();
    }

    async verifyProductsPageVisible() {
        await expect(this.title).toBeVisible();
    }

    async getAllProducts() {
        const products = await this.inventoryItems.all();
        const productList = [];
        for (const item of products) {
            const name = await item.locator('.inventory_item_name').innerText();
            const price = await item.locator('.inventory_item_price').innerText();
            productList.push({ name, price });
        }
        return productList;
    }

    async addProductToCart(index = 0) {
        const items = await this.inventoryItems.all();
        const addButton = items[index].locator('button[id^="add-to-cart"]');
        await addButton.click();
    }

    async addMultipleProducts(count) {
        const items = await this.inventoryItems.all();
        for (let i = 0; i < count; i++) {
            const addButton = items[i].locator('button[id^="add-to-cart"]');
            await addButton.click();
        }
    }


    async getCartQuantity() {
        if (await this.shoppingCartBadge.isVisible()) {
            return await this.shoppingCartBadge.innerText();
        }
        return '0';
    }

    async goToCart() {
        await this.shoppingCartLink.click();
    }
}

module.exports = ProductsPage;
