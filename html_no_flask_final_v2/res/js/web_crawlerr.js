const browser = await puppeteer.launch({ headless: true });
//如果為false則會開啟瀏覽器，適合用作於debug時。
const page = await browser.newPage();
await page.goto('https://ntusportscenter.ntu.edu.tw/#/');