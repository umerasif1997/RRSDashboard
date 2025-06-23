import { Page, Locator, expect } from '@playwright/test';

export class BasePage{
        protected page: Page;

        constructor(page:Page) {
            this.page = page;
        }

        async navigateto(url: string):  Promise<void>{
            await this.page.goto(url)
        }

        async click(locator: Locator): Promise<void> {
            await locator.click();
        }

        async fill(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() ?? '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async expectText(locator: Locator, expected: string): Promise<void> {
    await expect(locator).toHaveText(expected);
  }


}