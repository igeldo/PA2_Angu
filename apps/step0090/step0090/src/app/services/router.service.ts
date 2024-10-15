import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Routes } from "../../assets/route-enumeration";

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
}
