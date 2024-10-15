import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { AuftragService } from '@conciso/auftrag';
import { PersonDetailComponent, PersonService } from '@conciso/person';
import { RouterService, SummaryViewComponent } from '@conciso/shared';
import { ShoppingCartService } from '@conciso/artikel';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [CommonModule, StepperModule, PersonDetailComponent, ButtonModule, SummaryViewComponent],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css',
})
export class OrderViewComponent implements OnDestroy{

  userForm = this.personService.getUserForm();
  addressForm = this.personService.getAddressForm();

  constructor(
    private auftragService: AuftragService,
    private personService: PersonService,
    private cartService: ShoppingCartService,
    private router: RouterService
  ) {}

  ngOnDestroy(): void {
    this.personService.resetForm();
  }


  handleStep(event: EventEmitter<null>, type: 'next' | 'back' | 'finish') {
    this.modifyFormGroup(type)
    event.emit();
  }

  private submit() {
    this.auftragService.createAuftrag();
    this.router.routeToShopping();
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
        break;
      }
      default: {
        throw new Error("Illegal State of variable type");
      }
    }
  }
}
