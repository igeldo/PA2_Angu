import { Page } from "@playwright/test";
import { TestIds } from "../enums/TestIdEnumeration";
import { Inputs } from "../enums/Inputs";
import { Routes } from "../enums/Routes";

export class BasePage {

  protected page: Page;

  protected getTestClass = (className: string) => `[test-id="${className}"]`;

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

  async logIn() {
    await this.page.goto(Routes.BASE_FRONTEND_URL);
    let usernameInput = this.getLocatorFrom(TestIds.USERNAME_INPUT);
    let passwordInput = this.getLocatorFrom(TestIds.PASSWORD_INPUT);
    let loginBtn = this.getLocatorFrom(TestIds.LOGIN_BTN);

    await usernameInput.fill(Inputs.USERNAME);
    await passwordInput.fill(Inputs.PASSWORD);

    await loginBtn.click();
  }
}