import { test as base, expect, Page } from '@playwright/test';
import { TestIds } from './enums/TestIdEnumeration';
import { Routes } from './enums/Routes';
import { OrderPage } from './fixtures/order-page';
import { OrderPrefilledPage } from './fixtures/order-filled-personals-page';

const test = base.extend<{ orderPage: OrderPage, orderPreFilledPage: OrderPrefilledPage }>({
  orderPage: async ({ page }, use) => {
    const orderPage = new OrderPage(page);
    await orderPage.logIn();
    await orderPage.fillShoppingCart();
    await use(orderPage);
  },
  orderPreFilledPage: async ({ page }, use) => {
    const orderPreFilledPage = new OrderPrefilledPage(page);
    await orderPreFilledPage.logIn();
    await orderPreFilledPage.fillShoppingCart();
    await orderPreFilledPage.fillAllOrderInputs();
    await use(orderPreFilledPage); 
  }
});

test('Next button is disabled while not all personal information are filled', async ({ orderPage }) => {
  // arrange
  let nextBtn = orderPage.getLocatorFrom(TestIds.PERSONAL_INFORMATION_NEXT_BTN).locator("button");

  // act
  let btnDisabled = await nextBtn.isDisabled();

  // assert
  expect(btnDisabled).toBeTruthy();
});

test('Next button is enabled when all personal informations given', async ({ orderPreFilledPage }) => {
  // arrange
  let nextBtn = orderPreFilledPage.getLocatorFrom(TestIds.PERSONAL_INFORMATION_NEXT_BTN);

  // act
  let btnDisabled = await nextBtn.isDisabled();

  //assert
  expect(btnDisabled).not.toBeTruthy();
});

test('Person can be created', async ({ orderPreFilledPage }) => {
  // arrange 
  let nextBtn = orderPreFilledPage.getLocatorFrom(TestIds.PERSONAL_INFORMATION_NEXT_BTN);
  let orderNowBtn = orderPreFilledPage.getLocatorFrom(TestIds.ORDER_NOW_BTN);
  let requestPromise = orderPreFilledPage.getRequestPromiseFrom(Routes.POST_PERSON_URL);

  //act
  await nextBtn.click();
  await orderNowBtn.click();
  let request = await requestPromise;

  // assert
  expect(request.url()).toEqual(Routes.POST_PERSON_URL);
  expect(request.method()).toEqual("POST");
});
