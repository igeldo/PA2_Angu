import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-total-bill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total-bill.component.html',
  styleUrl: './total-bill.component.css',
})
export class TotalBillComponent {
  @Input() amount : number | null = null;
}
