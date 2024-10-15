import { Route } from '@angular/router';
import { ShoppingViewComponent } from '@conciso/artikel';
import { AuftragHistoryComponent, OrderViewComponent } from '@conciso/auftrag';
import { authGuard, LogInComponent } from '@conciso/auth';
import { PageNotFoundComponent, Routes } from '@conciso/shared';

export const appRoutes: Route[] = [
  { path: Routes.LOGIN, component: LogInComponent },
  { path: Routes.SHOPPING, component: ShoppingViewComponent, canActivate: [authGuard]},
  { path: Routes.ORDER, component: OrderViewComponent , canActivate: [authGuard]},
  { path: Routes.AUFTRAG_HISTORY, component: AuftragHistoryComponent , canActivate: [authGuard]},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
