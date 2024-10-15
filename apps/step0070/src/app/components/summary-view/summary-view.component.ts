import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { OrderService } from '../../services/order.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-summary-view',
  standalone: true,
  imports: [CommonModule, DividerModule, InputTextModule, FormsModule, ReactiveFormsModule, ShoppingCartComponent, FieldsetModule],
  templateUrl: './summary-view.component.html',
  styleUrl: './summary-view.component.css',
})
export class SummaryViewComponent{

  userFormGroup = this.orderService.getUserForm();
  addressFormGroup = this.orderService.getAddressForm();
  
  cartList = this.cartService.cartListSignal;

  constructor(
    private orderService: OrderService,
    private cartService: ShoppingCartService
  ) {}
}
