import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopItem } from 'apps/step0060/src/assets/shop-item';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, ScrollPanelModule, DividerModule, ButtonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent{

  @Input() cartItems: ShopItem[] = [];

  calculateAllAmount() {
    let allAmount = 0;
    for(let item of this.cartItems) {
      allAmount += item.price;
    }

    return allAmount.toFixed(2);
  }

  getItemsDistinct() {
    let items: ShopItem[] = [];

    for(let item of this.cartItems) {
      if(items.find(x => x.name == item.name) == undefined)
        items.push(item);
    }

    return items.sort((x,y) => {
      if(x.name == y.name)
        return 0;
      return x.name > y.name ? 1 : -1;
    });
  }

  getNumberOfDuplicates(item: ShopItem) {
    let duplicates = this.cartItems.filter(x => x.name == item.name);
    return duplicates.length;
  }
  removeItem(item: ShopItem) {
    let index = this.cartItems.indexOf(item);
    this.cartItems.splice(index, 1);
  }
}
