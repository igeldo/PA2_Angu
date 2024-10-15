import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopItem } from '../../../assets/shop-item';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-shop-item',
  standalone: true,
  imports: [CommonModule, ButtonModule, ImageModule, DividerModule, CardModule],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.css',
})
export class ShopItemComponent {

  @Input() item: ShopItem | null = null;  

  @Output() addToCartEvent = new EventEmitter<ShopItem>();

  addToCart() {
    this.addToCartEvent.emit(this.item!);
  }
}
