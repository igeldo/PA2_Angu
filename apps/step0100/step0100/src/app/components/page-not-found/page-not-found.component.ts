import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css',
})
export class PageNotFoundComponent {

  constructor(private router: RouterService) {

  }

  routeToShopping() {
    this.router.routeToShopping();
  }
}
