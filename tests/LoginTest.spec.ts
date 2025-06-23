import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import logindata from '../data/logindata.json';
import fs from 'fs';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('valid login', async ({ page }) => {
    await loginPage.enterUsername(logindata.validUser.username);
    await loginPage.enterPassword(logindata.validUser.password);
    await loginPage.clickLoginButton();
    await page.waitForTimeout(2000); // Wait for the toast to appear
    const toastVisible = await loginPage.isLoginSuccessToastVisible();
    expect(toastVisible).toBeTruthy();
  });

  test('invalid login', async ({ page }) => {
    await loginPage.enterUsername(logindata.invalidUser.username);
    await loginPage.enterPassword(logindata.invalidUser.password);
    await loginPage.clickLoginButton();
    await page.waitForTimeout(2000); // Wait for the toast to appear
    const toastVisible = await loginPage.isLoginErrorToastVisible();
    expect(toastVisible).toBeTruthy();
  });

  test.afterEach(async ({ page }, testInfo) => {
    const dir = 'screenshots';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    if (testInfo.status !== testInfo.expectedStatus) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `${testInfo.title.replace(/\s+/g, '_')}_${timestamp}_FAILED.png`;
      const filePath = `${dir}/${fileName}`;

      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`❌ Screenshot saved at: ${filePath}`);
    }

    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });
});
