# Playwright Cucumber Automation Framework

This project is an automation framework built with Playwright and Cucumber (JavaScript) for the SauceDemo website.

## Requirements
- Node.js installed
- Playwright browsers installed (`npx playwright install`)

## Structure
- `data/`: Contains JSON files for test data (e.g., credentials).
- `features/`: Contains Gherkin feature files and step definitions.
- `pages/`: Implements the Page Object Model (POM) pattern.
- `cucumber.js`: Cucumber configuration.

## How to Run
To execute the tests, run:
```bash
npm test
```

## Features
- Logging for debugging (console logs during steps).
- HTML Report generated in `reports/cucumber-report.html`.
- POM design for maintainability.
