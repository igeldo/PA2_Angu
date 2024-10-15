import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ShoppingCartService } from '@conciso/artikel';
import { LoadingService, MenuService, RouterService } from '@conciso/shared';
import { HeaderComponent } from './components/header/header.component';
import { DockModule } from 'primeng/dock';

@Component({
  standalone: true,
  imports: [
    // Modules
    RouterModule,
    CommonModule,
    DividerModule,
    DialogModule,
    ToastModule,
    ProgressSpinnerModule,
    DockModule,

    // Directives
    NgFor,

    // Components
    HeaderComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLoadingSignal = this.loadingService.isLoadingSignal;

  cartList = this.cartService.cartListSignal;
  menuItems = this.menuService.getItems();

  constructor(
    private cartService: ShoppingCartService,
    private loadingService: LoadingService,
    private router: RouterService,
    private menuService: MenuService
  ) { }

  toggleVisibility() {
    this.cartService.toggleCartVisibility();
  }

  closeCart() {
    this.cartService.closeCart();
  }

  redirectTo(event:any) {
    if(event.index == 0) {
      this.router.routeToShopping();
      return;
    }
    this.router.routeToHistory();
  }
}
