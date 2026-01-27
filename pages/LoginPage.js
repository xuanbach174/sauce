require('dotenv').config();
const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  #usernameInputLocator() {
    return this.page.locator('#user-name');
  }

  #passwordInputLocator() {
    return this.page.locator('#password');
  }

  #loginButtonLocator() {
    return this.page.locator('#login-button');
  }

  async login(username, password) {
    console.log(`Logging in with user: ${username}`);
    await this.#usernameInputLocator().fill(username);
    await this.#passwordInputLocator().fill(password);
    await this.#loginButtonLocator().click();
  }

  async navigate() {
    const url = process.env.BASE_URL;
    if (!url) {
      throw new Error('BASE_URL environment variable is not defined!');
    }
    await this.navigateTo(url);
  }
}

module.exports = LoginPage;
