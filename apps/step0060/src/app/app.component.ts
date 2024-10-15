import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShopItemComponent } from './components/shop-item/shop-item.component';
import { ShopItem } from '../assets/shop-item';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { DialogModule } from 'primeng/dialog';
import { HeaderComponent } from './components/header/header.component';

@Component({
  standalone: true,
  imports: [
    // Modules
    RouterModule,
    CommonModule,
    DataViewModule,
    ButtonModule,
    DividerModule,
    BadgeModule,
    DialogModule,

    // Directives
    NgFor,

    // Components
    ShopItemComponent,
    ShoppingCartComponent,
    HeaderComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []
})
export class AppComponent {

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

  private cartListSubject = new BehaviorSubject<ShopItem[]>([]);
  cartList$ = this.cartListSubject.asObservable();

  addToCart(item: ShopItem) {
    let cartItems = this.cartListSubject.value;
    cartItems.push(item);
    this.cartListSubject.next(cartItems);
  }
}
