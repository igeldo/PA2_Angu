import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { ShopItemComponent } from './components/shop-item/shop-item.component';
import { ShopItem } from '../assets/shop-item';
import { TotalBillComponent } from './components/total-bill/total-bill.component';
import { BehaviorSubject, of } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, NgFor, CommonModule, ShopItemComponent, TotalBillComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'step0040';

  items = [
    {
      name: "Apple",
      src: "/assets/apple.png",
      price: 2.12
    },
    {
      name: "Pear",
      src: "/assets/pear.png",
      price: 1.65
    },
    {
      name: "Banana",
      src: "/assets/banana.png",
      price: 3.78,
    }
  ] as ShopItem[];

  private totalBillSubject = new BehaviorSubject<number>(0);
  totalBill$ = this.totalBillSubject.asObservable();

  addToBill(price: number) {
    let bill = (this.totalBillSubject.value + price).toFixed(2);
    this.totalBillSubject.next(parseFloat(bill));
  }
}
