import puppeteer from 'puppeteer';
import cookies from '../credentials/cookies.json' assert {type: "json"};
import cookieService from '../services/cookie.js';

(async () => {
  await cookieService.createFacebookCookie()

  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.setCookie(...cookies);

  // Open the iherb in browser
  await page.goto('https://nl.iherb.com/');

  // Accept all cookies
  await page.waitForSelector('#truste-consent-button');
  await page.click('#truste-consent-button');

  await page.waitFor(2000);

  // Click on sign in
  await page.waitForSelector('#iherb-account > div > span > a');
  await page.click('#iherb-account > div > span > a');

  // Login through facebook
  await page.waitForSelector('#login-box > div:nth-child(2) > section > div:nth-child(4) > a');
  await page.click('#login-box > div:nth-child(2) > section > div:nth-child(4) > a');

  await page.waitFor(5000);

  // Confirm our facebook account
  await page.mouse.click(410, 410);
})();
