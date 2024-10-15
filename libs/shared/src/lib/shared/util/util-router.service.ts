import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Routes } from "@conciso/shared";

/**
 * @description
 * @class
 */
@Injectable({providedIn: 'root'})
export class RouterService {

  constructor(private router: Router) { }

  routeToShopping() {
    this.router.navigate(['/'+ Routes.SHOPPING]);
  }

  routeToOrder() {
    this.router.navigate(['/'+ Routes.ORDER]);
  }

  routeToHistory() {
    this.router.navigate(['/'+ Routes.AUFTRAG_HISTORY]);
  }

  routeToLogin() {
    return this.router.navigate(['/'+ Routes.LOGIN]);
  }

  isCurrentRoute(route: string) {
    let url = this.router.url;
    return url.includes(route);
  }
}
