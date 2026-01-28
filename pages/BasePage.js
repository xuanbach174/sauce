require('dotenv').config();

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        const url = process.env.BASE_URL || 'https://www.saucedemo.com/';
        try {
            console.log(`Navigating to: ${url}`);
            await this.page.goto(url);
        } catch (error) {
            console.error(`Failed to navigate to ${url}:`, error);
            throw error;
        }
    }
}

module.exports = { BasePage };
