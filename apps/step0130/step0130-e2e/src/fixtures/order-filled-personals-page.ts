import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { TestIds } from "../enums/TestIdEnumeration";
import { OrderPage } from "./order-page";

export class OrderPrefilledPage extends OrderPage {

  constructor(page: Page) {
    super(page);
  }

  async fillAllOrderInputs() {
    let firstnameInput = this.getLocatorFrom(TestIds.VORNAME_INPUT);
    let nameInput = this.getLocatorFrom(TestIds.NAME_INPUT);
    let streetInput = this.getLocatorFrom(TestIds.STRASSE_INPUT);
    let plzInput = this.getLocatorFrom(TestIds.PLZ_INPUT);
    let locationInput = this.getLocatorFrom(TestIds.ORT_INPUT);
    let nextBtn = this.getLocatorFrom(TestIds.PERSONAL_INFORMATION_NEXT_BTN).locator("button");
  
    await firstnameInput.fill("Max");
    await nameInput.fill("Mustermann");
    await streetInput.fill("Musterstrasse");
    await plzInput.fill("12345");
    await locationInput.fill("Musterort");
  }
}