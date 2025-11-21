// scripts/capture_screenshots.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Adjust port if needed; default to 3002 (dev server may be on 3002)
const PORT = process.env.PORT || 3002;

const projects = [
    { name: 'e-commerce', url: `http://localhost:${PORT}/projects/e-commerce` },
    { name: 'ai-chat', url: `http://localhost:${PORT}/projects/ai-chat` },
    { name: 'task-management', url: `http://localhost:${PORT}/projects/task-management` },
    { name: 'ios-todo', url: `http://localhost:${PORT}/projects/ios-todo` },
];

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const screenshotDir = path.resolve(__dirname, '..', 'public', 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }
    for (const proj of projects) {
        console.log('Capturing', proj.name);
        await page.goto(proj.url, { waitUntil: 'networkidle2', timeout: 60000 });
        // Wait a bit for animations to settle
        await page.waitForTimeout(2000);
        const filePath = path.join(screenshotDir, `${proj.name}.png`);
        await page.screenshot({ path: filePath, fullPage: true });
        console.log('Saved to', filePath);
    }
    await browser.close();
})();
