import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import logindata from '../data/logindata.json';

test.skip('valid login', async ({ page }) => {
  // Initialize the LoginPage instance
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  await loginPage.enterUsername(logindata.validUser.username);
  await loginPage.enterPassword(logindata.validUser.password);
  await loginPage.clickLoginButton();
  await page.waitForTimeout(2000); // Wait for the toast to appear
  const toastVisible = await loginPage.isLoginSuccessToastVisible();
  expect(toastVisible).toBeTruthy();
});


test('invalid login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  await loginPage.enterUsername(logindata.invalidUser.username);
  await loginPage.enterPassword(logindata.invalidUser.password);
  await loginPage.clickLoginButton();
  await page.waitForTimeout(2000); // Wait for the toast to appear
  const toastVisible = await loginPage.isLoginErrorToastVisible();
  expect(toastVisible).toBeTruthy();
});

