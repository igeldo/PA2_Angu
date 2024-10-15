import { test as base, expect } from '@playwright/test';
import { TestIds } from './enums/TestIdEnumeration';
import { Routes } from './enums/Routes';
import { ShoppingPage } from './fixtures/shopping-page';
import { Inputs } from './enums/Inputs';
import { BasePage } from './fixtures/base-page';

const test = base.extend<{ shoppingPage: ShoppingPage, basePage: BasePage }>({
  shoppingPage: async ({ page }, use) => {
    const shoppingPage = new ShoppingPage(page);
    await shoppingPage.logIn();
    await use(shoppingPage);
  }, 
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await basePage.goToBaseUrl();
    use(basePage);
  }
});

test('Initial page has right URL', async ({ basePage }) => {
  // arrange
  let page = basePage.getPage();
  // act

  // assert
  await expect(page).toHaveURL(Routes.LOGIN_URL);
});

test('Not found component is present when uknown url is called', async ({ shoppingPage }) => {
  // arrange
  await shoppingPage.goToNotExistingURl();
  let header = shoppingPage.getLocatorFrom(TestIds.NOT_FOUND_HEADER);
  let redirectButton = shoppingPage.getLocatorFrom(TestIds.NOT_FOUND_BTN);

  //act

  // assert
  await expect(header).toHaveText(Inputs.NOT_FOUND_HEADER_TEXT);
  await expect(redirectButton).toBeVisible();
});

test('Shop items are present when calling Shopping URL', async ({ shoppingPage }) => {
  // arrange
  
  let shopItems = shoppingPage.getLocatorFrom(TestIds.SHOP_ITEM);
  // act

  //assert
  await expect(shopItems).toHaveCount(3);
});

test('Items can be added to cart', async ({ shoppingPage }) => {
  // arrange
  let addToCartBtns = await shoppingPage.getLocatorFrom(TestIds.ADD_TO_CART_BTN).all();
  let cartEntries = shoppingPage.getLocatorFrom(TestIds.ITEM_CART_ENTRY);
  let shoppingCartBtn = shoppingPage.getLocatorFrom(TestIds.SHOPPING_CART_BTN);

  // act
  for(let button of addToCartBtns) {
    await button.click();
  }
  await shoppingCartBtn.click();

  // assert
  await expect(cartEntries).toHaveCount(addToCartBtns.length);
});

test('Buy now button is disabled while no items added to cart', async ({ shoppingPage }) => {
  // arrange
  let shoppingCartBtn = shoppingPage.getLocatorFrom(TestIds.SHOPPING_CART_BTN);
  let buyNowButton = shoppingPage.getLocatorFrom(TestIds.BUY_NOW_BTN).locator("button");

  // act
  await shoppingCartBtn.click();
  
  // assert
  await expect(buyNowButton).toBeDisabled();
});

test('Request person by id works', async ({ shoppingPage }) => {
  // arrange
  let personIdInput = shoppingPage.getLocatorFrom(TestIds.PERSON_ID_INPUT).locator("input");
  let requestPromise = shoppingPage.getRequestPromiseFrom(Routes.GET_PERSON_BY_ID_URL);
  let personSearchBtn = shoppingPage.getLocatorFrom(TestIds.PERON_SEARCH_BTN);

  // act
  await personIdInput.fill("1");
  await personSearchBtn.click();
  let request = await requestPromise;

  // assert
  expect(request.url()).toEqual(Routes.GET_PERSON_BY_ID_URL);
  expect(request.method()).toEqual("GET");
});