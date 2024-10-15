import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShopItemComponent } from './components/shop-item/shop-item.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { DialogModule } from 'primeng/dialog';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppingViewComponent } from './components/shopping-view/shopping-view.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { ToastModule } from 'primeng/toast';
import { OrderService } from './services/order.service';
import { PersonFinderComponent } from './components/person-finder/person-finder.component';
import { RouterService } from './services/router.service';
import { HeaderComponent } from './components/header/header.component';

@Component({
  standalone: true,
  imports: [
    // Modules
    RouterModule,
    CommonModule,
    ButtonModule,
    DividerModule,
    BadgeModule,
    DialogModule,
    ToastModule,

    // Directives
    NgFor,

    // Components
    ShopItemComponent,
    ShoppingCartComponent,
    ShoppingViewComponent,
    PersonDetailComponent,
    OrderViewComponent,
    PersonFinderComponent,
    HeaderComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  showOrderView$ = this.orderService.showOrderView$;

  cartList = this.cartService.cartListSignal;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService
  ) { }

  toggleVisibility() {
    this.cartService.toggleCartVisibility();
  }

  closeCart() {
    this.cartService.closeCart();
  }
}
