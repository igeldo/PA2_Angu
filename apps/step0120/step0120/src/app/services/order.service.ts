import { Injectable, signal } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PersonApi } from "../api/person.api";
import { BehaviorSubject, catchError, filter, tap } from "rxjs";
import { Address } from "../../assets/address";
import { Person } from "../../assets/person";
import { toObservable } from "@angular/core/rxjs-interop";
import { MessageService } from "primeng/api";

/**
 * @description
 * @class
 */
@Injectable({ providedIn: 'root'})
export class OrderService {

  private orderFormGroup = new FormGroup({
    userForm: new FormGroup({
      vorname: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    }),
    addressForm: new FormGroup({
      strasse: new FormControl('', Validators.required),
      plz: new FormControl<number| null>(null, Validators.required),
      ort: new FormControl('', Validators.required),
    })
  });

  constructor(
    private personApi: PersonApi, 
    private toast: MessageService
  ) { }

  createUser() {
    let person = this.getUserForm().getRawValue() as Person;
    this.personApi.createPerson(person)
      .subscribe({
        next: (res) => {
          this.toast.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: 'Person wurde erfolgreich mit der id: '+ res.id +' gespeichert!' 
        });
      },
        error: (err) => {
          console.error(err);
          this.toast.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Beim Speichern der Person ist etwas schief gelaufen' 
          });
          this.orderFormGroup.reset();
        },
        complete: () => this.orderFormGroup.reset()
      });
  }

  getUserForm() {
    return this.orderFormGroup.controls.userForm;
  }

  getAddressForm() {
    return this.orderFormGroup.controls.addressForm;
  }
}
