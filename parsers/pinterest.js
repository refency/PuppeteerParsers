import puppeteer from 'puppeteer';
import cookies from '../credentials/cookies.json' assert {type: "json"};
import cookieService from '../services/cookie.js';

(async () => {
  await cookieService.createFacebookCookie()

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setCookie(...cookies);

  // Open pinterest in browser
  await page.goto('https://www.pinterest.com/');

  // Click on login button
  const [loginButton] = await page.$x("//button[contains(., 'Log in')]");
  await loginButton.click();

  const pageTarget = page.target();

  // Login through facebook
  await page.waitForSelector('#__PWS_ROOT__ > div.zI7.iyn.Hsu > div > div:nth-child(4) > div > div > div > div > div > div:nth-child(4) > div.zI7.iyn.Hsu > div:nth-child(1) > div > button')
  await page.click('#__PWS_ROOT__ > div.zI7.iyn.Hsu > div > div:nth-child(4) > div > div > div > div > div > div:nth-child(4) > div.zI7.iyn.Hsu > div:nth-child(1) > div > button')

  // Waiting for loading oaut page
  await page.waitFor(5000);

  let newTarget = await browser.waitForTarget(target => target.opener() === pageTarget);
  let newPage = await newTarget.page();

  // Confirm our facebook account
  await newPage.mouse.click(400, 340);
})();
