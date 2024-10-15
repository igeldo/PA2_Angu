import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { Routes } from "../enums/Routes";
import { TestIds } from "../enums/TestIdEnumeration";

export class OrderPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async goToOrderUrl() {
    await this.page.goto(Routes.ORDER_URL, { waitUntil: "load"});
  }
}