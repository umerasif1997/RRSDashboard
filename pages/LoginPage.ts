import {expect   , test} from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
 private usernameInput;
  private passwordInput;
  private loginButton;
  

  constructor(page: any) {
    super(page);
     this.usernameInput = this.page.locator('//input[@id="username"]');
     this.passwordInput = this.page.locator('//input[@id="password"]');
    this.loginButton = this.page.locator('//button[@type="submit"]');
  }

  async navigateToLogin(): Promise<void> {
    await this.navigateto('https://local-copilot-ai.web.app/authentication/login');
  }

  async enterUsername(username: string): Promise<void> {
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
  }

    async clickLoginButton(): Promise<void> {
        await this.click(this.loginButton);
    }

   async isLoginSuccessToastVisible(): Promise<boolean> {
  const toast = this.page.getByText('Login Successfully', { exact: false });
  try {
    await toast.waitFor({ state: 'visible', timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}
 
async isLoginErrorToastVisible(): Promise<boolean> {
  const toast = this.page.getByText('Incorrect username or password', { exact: false });
  try {
    // First wait for it to be in the DOM
    await toast.waitFor({ state: 'attached', timeout: 5000 });

    // Then check if it's visible
    await expect(toast).toBeVisible({ timeout: 2000 });

    return true;
  } catch {
    return false;
  }
}

}

