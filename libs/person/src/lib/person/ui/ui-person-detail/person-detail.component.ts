import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuftragService } from '@conciso/auftrag';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule,InputGroupModule, InputGroupAddonModule, FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.css',
})
export class PersonDetailComponent {

  @Input() userForm! : FormGroup;
  @Input() addressForm! : FormGroup;

  constructor() {}

}
