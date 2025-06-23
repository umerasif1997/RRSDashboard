import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import logindata from '../data/logindata.json';




test('invalid login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  await loginPage.enterUsername(logindata.invalidUser.username);
  await loginPage.enterPassword(logindata.invalidUser.password);
  await loginPage.clickLoginButton();
  await page.waitForTimeout(2000); // ⏱️ wait for 3 seconds
  const toastVisible = await loginPage.isLoginErrorToastVisible();
  expect(toastVisible).toBeTruthy();
});

