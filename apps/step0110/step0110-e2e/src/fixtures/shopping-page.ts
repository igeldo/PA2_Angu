import { Page } from "@playwright/test";
import { Routes } from "../enums/Routes";
import { BasePage } from "./base-page";

export class ShoppingPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async goToBaseUrl() {
    await this.page.goto(Routes.BASE_FRONTEND_URL, { waitUntil: "load"});
  }
  
  async goToNotExistingURl() {
    await this.page.goto(Routes.NOT_EXISTING_URL, { waitUntil: "load"});
  }

  async goToShoppingUrl() {
    await this.page.goto(Routes.SHOPPING_URL, { waitUntil: "load"});
  }
}