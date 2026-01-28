# Playwright Cucumber Automation Framework

This project is an automation framework built with Playwright and Cucumber (JavaScript) for the SauceDemo website.

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd sauce
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

## 📂 Project Structure

- `pages/`: Implements the **Page Object Model (POM)** pattern. Contains class definitions for each page.
- `tests_ui/`:
    - `features/`: Contains Gherkin `.feature` files.
    - `step_definitions/`: Contains Javascript logic mapping steps to code.
    - `support/`: Contains hooks (Before/After) and world setup.
- `cucumber.js`: Cucumber configuration profiles.
- `package.json`: Contains test scripts and dependencies.

## 🧪 How to Run Tests

### 1. Run on a single browser
You can run tests on a specific browser using predefined scripts:
```bash
# Run on Chromium (Default)
npm run test:chromium

# Run on Firefox
npm run test:firefox

# Run on Webkit (Safari engine)
npm run test:webkit
```

### 3. Run on multiple browsers (Parallel)
To run tests across browsers simultaneously or use multiple workers:
```bash

# Run chromium, firefox, and webkit concurrently using the 'concurrently' package
npm run test:all
```

## 📊 Reports
After running the tests, an HTML report is typically generated. Check the `reports/` folder (if configured) or the console output for the report link.

