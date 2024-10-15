import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "@conciso/auth";
import { RouterService } from "@conciso/shared";
import { firstValueFrom } from "rxjs";

export const authGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(RouterService);
  const authService = inject(AuthService);

  if(authService.isTokenExpired() && !authService.isRefreshExpired()) {
    await firstValueFrom(authService.acquireTokenByRefresh());
  }

  return authService.isTokenExpired() ? router.routeToLogin() : true;
}