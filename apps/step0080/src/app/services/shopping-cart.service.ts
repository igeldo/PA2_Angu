import { Injectable, signal } from "@angular/core";
import { ShopItem } from "../../assets/shop-item";

/**
 * @description
 * @class
 */
@Injectable({providedIn:'root'})
export class ShoppingCartService {

  cartVisible = signal(false);

  cartListSignal = signal([] as ShopItem[]);

  resetCartList() {
    this.cartListSignal.set([]);
  }

  toggleCartVisibility() {
    this.cartVisible.set(!this.cartVisible());
  }

  closeCart() {
    this.cartVisible.set(false);
  }

  addToCart(item: ShopItem) {
    this.cartListSignal.update((items) => {
      items.push(item)
      return items;
    });
  }

  calculateAllAmount(items: ShopItem[]) {
    let allAmount = 0;
    for(let item of items) {
      allAmount += item.price;
    }

    return allAmount.toFixed(2);
  }

  getItemsDistinct(items: ShopItem[]) {
    let distinctSorted: ShopItem[] = [];

    for(let item of items) {
      if(distinctSorted.find(x => x.name == item.name) == undefined)
        distinctSorted.push(item);
    }

    return distinctSorted.sort((x,y) => {
      if(x.name == y.name)
        return 0;
      return x.name > y.name ? 1 : -1;
    });
  }

  getNumberOfDuplicates(item: ShopItem, items: ShopItem[]) {
    let duplicates = items.filter(x => x.name == item.name);
    return duplicates.length;
  }
}
