import { Page } from "@playwright/test";

export class BasePage {

  protected page: Page;

  private getTestClass = (className: string) => `[test-id="${className}"]`;

  constructor(page: Page) {
    this.page = page;
  }

  getLocatorFrom(testId: string) {
    var testClass = this.getTestClass(testId);
    return this.page.locator(testClass);
  }

  getPage() {
    return this.page;
  }

  getRequestPromiseFrom(url: string) {
    return this.page.waitForRequest(url);
  }
}