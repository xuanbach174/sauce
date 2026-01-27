const { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(10000);

let browser;

BeforeAll(async function () {
    const baseReportDir = path.join(process.cwd(), 'reports');
    const videosDir = path.join(baseReportDir, 'videos');
    const screenshotsDir = path.join(baseReportDir, 'screenshots');

    [videosDir, screenshotsDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    const browserType = process.env.BROWSER || 'chromium';

    console.log(`\n Launching ${browserType} browser...\n`);

    switch (browserType) {
        case 'firefox':
            browser = await firefox.launch({ headless: false });
            break;
        case 'webkit':
            browser = await webkit.launch({ headless: false });
            break;
        case 'chromium':
        default:
            browser = await chromium.launch({ headless: false });
            break;
    }
});

Before(async function (scenario) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');

    this.context = await browser.newContext({
        recordVideo: {
            dir: 'reports/videos/',
            size: { width: 1280, height: 720 }
        },
        viewport: { width: 1280, height: 720 }
    });

    this.page = await this.context.newPage();
    this.scenarioName = scenarioName;
    this.timestamp = timestamp;
});

After(async function (scenario) {
    // 1. Capture screenshot if the scenario failed
    if (scenario.result?.status === Status.FAILED) {
        const screenshotPath = path.join(
            'reports',
            'screenshots',
            `FAILED_${this.scenarioName}_${this.timestamp}.png`
        );

        // Save screenshot to file
        await this.page.screenshot({ path: screenshotPath, fullPage: true });

        // Attach screenshot to report
        const screenshotBuffer = fs.readFileSync(screenshotPath);
        this.attach(screenshotBuffer, 'image/png');

        console.log(`Screenshot saved: ${screenshotPath}`);
    }

    // 2. Get the video path before closing
    const video = this.page.video();
    let videoPath;
    if (video) {
        videoPath = await video.path();
    }

    // 3. Close page and context (completes video recording)
    await this.page.close();
    await this.context.close();

    // 4. Attach the video to the report
    if (videoPath && fs.existsSync(videoPath)) {
        const videoBuffer = fs.readFileSync(videoPath);
        this.attach(videoBuffer, 'video/webm');
    }
});

AfterAll(async function () {
    if (browser) {
        await browser.close();
        console.log('\n Browser closed successfully\n');
    }
});
