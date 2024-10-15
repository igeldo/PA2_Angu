import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopItem } from 'apps/step0080/src/assets/shop-item';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ShoppingCartService } from '@conciso/artikel';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, ScrollPanelModule, DividerModule, ButtonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent{

  @Input() cartItems: ShopItem[] = [];
  @Input() showDeleteBtns = true;

  constructor(private cartService: ShoppingCartService) {

  }

  calculateAllAmount() {
    return this.cartService.calculateAllAmount(this.cartItems);
  }

  getItemsDistinct() {
    return this.cartService.getItemsDistinct(this.cartItems);
  }

  getNumberOfDuplicates(item: ShopItem) {
    return this.cartService.getNumberOfDuplicates(item, this.cartItems);
  }
  removeItem(item: ShopItem) {
    let index = this.cartItems.indexOf(item);
    this.cartItems.splice(index, 1);
  }
}
