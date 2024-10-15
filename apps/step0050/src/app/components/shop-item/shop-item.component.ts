import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopItem } from '../../../assets/shop-item';

@Component({
  selector: 'app-shop-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.css',
})
export class ShopItemComponent {

  @Input() position: number | null = null;
  @Input() item: ShopItem | null = null;  

  @Output() addToBillEvent = new EventEmitter<number>();

  addToBill() {
    this.addToBillEvent.emit(this.item?.price);
  } 
}
