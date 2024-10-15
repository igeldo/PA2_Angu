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

  async goToBaseUrl() {
    await this.page.goto(Routes.BASE_FRONTEND_URL);
  }

  async logIn() {
    await this.page.goto(Routes.LOGIN_URL);
    let loginBtn = this.getLocatorFrom(TestIds.LOGIN_BTN);

    await loginBtn.click();

    await this.getLocatorFrom(TestIds.LOADING_SPINNER).waitFor({ state: 'hidden', timeout: 100})
  }

  async fillShoppingCart() {
    let addShopItemBtn = this.getLocatorFrom(TestIds.ADD_TO_CART_BTN).first().locator("button");
    let openShoppingCartBtn = this.getLocatorFrom(TestIds.SHOPPING_CART_BTN).locator("button");
    let buyNowBtn = this.getLocatorFrom(TestIds.BUY_NOW_BTN).locator("button");

    await addShopItemBtn.click();
    await openShoppingCartBtn.click();
    await buyNowBtn.click();
  }
}