import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Address, Person, PersonApi } from "@conciso/person";
import { switchMap } from "rxjs";

/**
 * @description
 * @class
 */
@Injectable({providedIn: 'root'})
export class PersonService {

  private personFormGroup = new FormGroup({
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

  constructor(private personApi: PersonApi) { }

  createUserAndAddress() {
    let person = this.getUserForm().getRawValue() as Person;
    let address = this.getAddressForm().getRawValue() as Address;
    return this.personApi.createPerson(person)
    .pipe(
      switchMap(person => this.personApi.createAddress(person.id, address)),
    );
  }

  resetForm() {
    this.personFormGroup.reset();
    this.personFormGroup.enable();
  }

  getUserForm() {
    return this.personFormGroup.controls.userForm;
  }

  getAddressForm() {
    return this.personFormGroup.controls.addressForm;
  }
}