import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { Person, PersonApi } from '@conciso/person';

@Component({
  selector: 'app-person-finder',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputNumberModule, TooltipModule, FormsModule, ReactiveFormsModule, ToastModule],
  templateUrl: './person-finder.component.html',
  styleUrl: './person-finder.component.css',
})
export class PersonFinderComponent {

  personIdControl = new FormControl<number>(1, Validators.required);

  private successMsg = (person: Person) => `Die Person mit der Id: ${person.id} heißt ${person.vorname} ${person.name}`;
  private errorMsg = (id: number) => `Die Person mit der Id: ${id} konnte nicht gefunden werden.`;

  constructor(
    private personApi: PersonApi,
    private messageService: MessageService
  ) {}

  searchForPerson() {
    let id = this.personIdControl.value;

    this.personApi.getById(id!).subscribe({
      next: (person) => {
        let msg = this.successMsg(person);
        this.showMsg('success', msg);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        if(err.status == 404) {
          let msg = this.errorMsg(id!);
          this.showMsg('error', msg);
        }
      }
    });
  }

  private showMsg(
    type: 'success' | 'error', 
    msg: string
  ) {
    this.messageService.add({
      severity: type,
      summary: type == 'success' ? 'Erfolg' : "Error",
      detail: msg
    });
  }
}
