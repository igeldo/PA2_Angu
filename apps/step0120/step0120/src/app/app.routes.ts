import { Route } from '@angular/router';
import { ShoppingViewComponent } from './components/shopping-view/shopping-view.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { Routes } from '../assets/route-enumeration';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { authGuard } from './services/guards/auth-guards';

export const appRoutes: Route[] = [
  { path: Routes.LOGIN, component: LogInComponent },
  { path: Routes.SHOPPING, component: ShoppingViewComponent, canActivate: [authGuard]},
  { path: Routes.ORDER, component:OrderViewComponent , canActivate: [authGuard]},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
