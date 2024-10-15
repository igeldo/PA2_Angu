import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { AuftragService } from '@conciso/auftrag';
import { ShoppingCartComponent, ShoppingCartService } from '@conciso/artikel';
import { PersonService } from '@conciso/person';

@Component({
  selector: 'app-summary-view',
  standalone: true,
  imports: [CommonModule, DividerModule, InputTextModule, FormsModule, ReactiveFormsModule, ShoppingCartComponent, FieldsetModule],
  templateUrl: './summary-view.component.html',
  styleUrl: './summary-view.component.css',
})
export class SummaryViewComponent{

  userFormGroup = this.personService.getUserForm();
  addressFormGroup = this.personService.getAddressForm();
  
  cartList = this.cartService.cartListSignal;

  constructor(
    private orderService: AuftragService,
    private personService: PersonService,
    private cartService: ShoppingCartService
  ) {}
}
