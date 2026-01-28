require('dotenv').config();
const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = this.page.locator('#user-name');
    this.passwordInput = this.page.locator('#password');
    this.loginButton = this.page.locator('#login-button');
  }

  async login(username, password) {
    console.log(`Logging in with user: ${username}`);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async navigate() {
    const url = process.env.BASE_URL || 'https://www.saucedemo.com/';
    try {
      console.log(`Navigating to: ${url}`);
      await this.navigateTo(url);
    } catch (error) {
      console.error(`Failed to navigate to ${url}:`, error);
      throw error;
    }
  }
}

module.exports = LoginPage;
