import fs from 'fs';
import puppeteer from 'puppeteer';
import config from '../credentials/config.json' assert {type: "json"};
import cookies from '../credentials/cookies.json' assert {type: "json"};

class cookieService {
  // Function set cookie to authorize through facebook
  async createFacebookCookie () {  
    // If cookie doesn't exist will set it up 
    if(!Object.keys(cookies).length) {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();  

      // Open facebook in browser
      await page.goto('https://www.facebook.com/login');
  
      // Typing login and password to enter the facebook
      await page.type('#email', config.login, { delay: 50 });
      await page.type('#pass', config.password, { delay: 50 });
  
      // Click to login button
      await page.click('#loginbutton');
  
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
      await page.waitFor(15000);
    
      // Checking if exist the selector of button profile
      try {
        await page.waitFor('div.bp9cbjyn:nth-child(5) > a:nth-child(1)');
      } catch (err) {
        console.log('Login is failed !');
        process.exit(0);
      }
    
      const currentCookies = await page.cookies();

      // Set cookie in file
      fs.writeFileSync('./credentials/cookies.json', JSON.stringify(currentCookies));

      await browser.close();
    }
  }
}

export default new cookieService();
