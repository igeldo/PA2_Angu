import { Injectable, signal } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Routes } from "@conciso/shared";

/**
 * @description
 * @class
 */
@Injectable({providedIn: 'root'})
export class MenuService {

  constructor() {}

  getItems() {
    return [
      {
        label: "Shop",
        iconClass: "pi pi-shopping-bag text-600",
        styleClass: "text-600",
        routerLink: Routes.SHOPPING
      },
      {
        label: "History",
        iconClass: "pi pi-history text-600",
        styleClass: "text-600",
        routerLink: Routes.AUFTRAG_HISTORY
      }
    ] as MenuItem[]
  }
}
