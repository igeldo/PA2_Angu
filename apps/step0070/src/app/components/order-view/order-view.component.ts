import { Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { PersonDetailComponent } from '../person-detail/person-detail.component';
import { ButtonModule } from 'primeng/button';
import { OrderService } from '../../services/order.service';
import { SummaryViewComponent } from '../summary-view/summary-view.component';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [CommonModule, StepperModule, PersonDetailComponent, ButtonModule, SummaryViewComponent],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css',
})
export class OrderViewComponent {

  userForm = this.orderService.getUserForm();
  addressForm = this.orderService.getAddressForm();

  constructor(
    private orderService: OrderService,
    private cartService: ShoppingCartService
  ) {}


  handleStep(event: EventEmitter<null>, type: 'next' | 'back' | 'finish') {
    this.modifyFormGroup(type)
    event.emit();
  }

  private submit() {
    this.orderService.createUser();
    this.cartService.resetCartList();
    this.orderService.toggleOrderView();
  }

  private modifyFormGroup(type: 'next' | 'back' | 'finish') {
    switch (type) {
      case 'next': {
        this.userForm.disable();
        this.addressForm.disable();
        break;
      }
      case 'back': {
        this.userForm.enable();
        this.addressForm.enable();
        break;
      }
      case 'finish': {
        this.submit();
        this.userForm.enable();
        this.addressForm.enable();
        break;
      }
      default: {
        throw new Error("Illegal State of variable type");
      }
    }
  }
}
