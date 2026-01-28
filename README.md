# Playwright Cucumber Automation Framework

This project is an automation framework built with Playwright and Cucumber (JavaScript) for the SauceDemo website. It features Page Object Model (POM), cross-browser testing, and parallel execution.

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

4. **Environment Setup**:
   The project uses a `.env` file for configuration. It is already included in the repository with default values:
   ```bash
   BASE_URL=https://www.saucedemo.com/
   ```

## 📂 Project Structure

- `pages/`: Implements the **Page Object Model (POM)**. Locators are defined in the constructor for better readability.
- `tests_ui/`:
    - `features/`: Gherkin `.feature` files.
    - `step_definitions/`: JavaScript logic mapping steps to code.
    - `support/`: Hooks (Before/After), World setup, and Custom World parameters.
- `.vscode/`: contains `settings.json` to enable "Go to Definition" for Cucumber steps in VS Code.
- `cucumber.js`: Configuration profiles for different browsers and environments.
- `package.json`: Test scripts and dependency management.

## 🧪 How to Run Tests

### 1. Run on a single browser
```bash
# Run on Chromium (Default)
npm run test:chromium

# Run on Firefox
npm run test:firefox

# Run on Webkit (Safari engine)
npm run test:webkit
```

### 2. Run Parallel with Multiple Workers
This splits the scenarios across multiple workers of the same browser (Chromium by default).
```bash
# Run with 3 parallel workers and automatically open the report
npm run test:parallel:report
```

### 3. Run Cross-Browser (Parallel)
This runs the entire test suite on Chromium, Firefox, and Webkit simultaneously.
```bash
npm run test:all
```

## 🛠 VS Code Setup
To get the best experience (syntax highlighting and navigation), please install the following extensions:
- **Cucumber (Gherkin) Full Support**
- **Cucumber** (Official)

The project includes a `.vscode/settings.json` file that automatically configures these extensions to find the step definitions.

## 📊 Reports
After running the tests, an HTML report is generated in the `reports/` folder.
- If you use `npm run test:parallel:report`, the report will open automatically.
- Otherwise, open `reports/cucumber-report.html` manually in your browser.
