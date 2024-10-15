import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ShopItem } from 'apps/step0060/src/assets/shop-item';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,

    ShoppingCartComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() itemsLength : number = 0;
  @Input() cartList : ShopItem[] = [];

  cartVisible = false;

  toggleCartVisibility() {
    this.cartVisible = !this.cartVisible;
  }
}
