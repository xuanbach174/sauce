module.exports = {
    default: {
        paths: ['tests_ui/features/*.feature'],
        require: [
            'tests_ui/support/world.js',
            'tests_ui/support/hooks.js',
            'tests_ui/step_definitions/*.js'
        ],
        format: [
            'progress-bar',
            'html:reports/cucumber-report.html'
        ],
        publishQuiet: true,
    },
    // Profile for Chromium browser
    chromium: {
        paths: ['tests_ui/features/*.feature'],
        require: [
            'tests_ui/support/world.js',
            'tests_ui/support/hooks.js',
            'tests_ui/step_definitions/*.js'
        ],
        format: [
            'progress-bar',
            'html:reports/chromium/cucumber-report.html'
        ],
        publishQuiet: true,
        worldParameters: {
            browser: 'chromium'
        }
    },
    // Profile for Firefox browser
    firefox: {
        paths: ['tests_ui/features/*.feature'],
        require: [
            'tests_ui/support/world.js',
            'tests_ui/support/hooks.js',
            'tests_ui/step_definitions/*.js'
        ],
        format: [
            'progress-bar',
            'html:reports/firefox/cucumber-report.html'
        ],
        publishQuiet: true,
        worldParameters: {
            browser: 'firefox'
        }
    },
    // Profile for WebKit browser
    webkit: {
        paths: ['tests_ui/features/*.feature'],
        require: [
            'tests_ui/support/world.js',
            'tests_ui/support/hooks.js',
            'tests_ui/step_definitions/*.js'
        ],
        format: [
            'progress-bar',
            'html:reports/webkit/cucumber-report.html'
        ],
        publishQuiet: true,
        worldParameters: {
            browser: 'webkit'
        }
    },
}
