import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ShopItemComponent } from '../shop-item/shop-item.component';
import { ShopItem } from 'apps/step0070/src/assets/shop-item';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-view',
  standalone: true,
  imports: [CommonModule, DataViewModule, ShopItemComponent],
  templateUrl: './shopping-view.component.html',
  styleUrl: './shopping-view.component.css',
})
export class ShoppingViewComponent {

  constructor(private cartService: ShoppingCartService) {}

  addToCart(item: ShopItem) {
    this.cartService.addToCart(item);
  }

  items = [
    {
      name: "Apple",
      src: "/assets/apple.png",
      price: 2.12
    },
    {
      name: "Pear",
      src: "/assets/pear.png",
      price: 1.65
    },
    {
      name: "Banana",
      src: "/assets/banana.png",
      price: 3.78,
    }
  ] as ShopItem[];
}
