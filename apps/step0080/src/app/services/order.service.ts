import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PersonApi } from "../api/person.api";
import { BehaviorSubject, filter, tap } from "rxjs";
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

  private showOrderViewSubject = new BehaviorSubject<boolean>(false);
  showOrderView$ = this.showOrderViewSubject.asObservable();

  constructor(
    private personApi: PersonApi, 
    private toast: MessageService
  ) { }
  
  createUser() {
    let formData = this.mapFormgroupToFormData(this.getUserForm());
    this.personApi.createPerson(formData)
      .pipe(
        tap(x => console.log("FIRST")),
        filter((res) => res != null),
        tap(x => console.log("Second")),
      ).subscribe({
        next: (res) => {
          console.log("Third");
          this.toast.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: 'Person wurde erfolgreich mit der id: '+ res.id +' gespeichert!' 
        });
      },
        error: (err) => {
          console.error(err);
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

  private mapFormgroupToFormData(formGroup: FormGroup) {
    let keys = Object.keys(formGroup.getRawValue());
    const data = new FormData();

    for(let key of keys) {
      data.append(key, formGroup.get(key)?.value);
    }
    return data;
  }
}
