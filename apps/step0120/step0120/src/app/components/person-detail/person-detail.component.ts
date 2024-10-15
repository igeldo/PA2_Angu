import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { OrderService } from '../../services/order.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule,InputGroupModule, InputGroupAddonModule, FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.css',
})
export class PersonDetailComponent {

  userForm = this.orderService.getUserForm();
  addressForm = this.orderService.getAddressForm();

  constructor(private orderService: OrderService) {}

}
