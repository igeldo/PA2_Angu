import { Route } from '@angular/router';
import { ShoppingViewComponent } from './components/shopping-view/shopping-view.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { Routes } from '../assets/route-enumeration';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const appRoutes: Route[] = [
  { path: Routes.SHOPPING, component: ShoppingViewComponent},
  { path: Routes.ORDER, component:OrderViewComponent },
  { path: '',   redirectTo: '/shopping', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
