import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ShopItem } from 'apps/step0080/src/assets/shop-item';
import { ShoppingCartComponent, ShoppingCartService } from '@conciso/artikel';
import { PersonFinderComponent } from '@conciso/person';
import { RouterService } from '@conciso/shared';
import { AuthService } from '@conciso/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [    
    CommonModule,
    ButtonModule,
    DialogModule,

    ShoppingCartComponent,
    PersonFinderComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() itemsLength : number = 0;
  @Input() cartList : ShopItem[] = [];

  cartVisible = this.cartService.cartVisible;

  constructor(
    private cartService: ShoppingCartService,
    private router: RouterService,
    private authService: AuthService
  ) {}

  toggleCartVisibility() {
    this.cartService.toggleCartVisibility();
  }
  openOrderView() {
    this.router.routeToOrder();
    this.toggleCartVisibility();
  }

  logOut() {
    this.authService.logout();
  }
}
