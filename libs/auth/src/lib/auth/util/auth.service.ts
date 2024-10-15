import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { AuthApi, Token } from "@conciso/auth";
import { RouterService, Routes } from '@conciso/shared';

/**
 * @description
 * @class
 */
@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private authApi: AuthApi, 
    private router: RouterService
  ) { }

  login(username: string, password: string) {
    this.authApi.acquireToken(username, password)
      .pipe(
        tap((token) => this.copyTokenToLocalStorage(token))
      ).subscribe({
        complete: () => this.router.routeToShopping(),
        error: (err) => console.error(err)
      });
  }

  acquireTokenByRefresh() {
    let refresh = this.getRefresh()!;

    return this.authApi.acquireTokenWithRefresh(refresh)
      .pipe(
        tap(token => this.copyTokenToLocalStorage(token))
      );
  }

  logout() {
    this.clearTokenInfos();
    this.router.routeToLogin();
  }

  getAuthHeader() {
    let token = this.getToken();

    return {
      Authorization: `Bearer ${token}`
    }
  }

  isTokenExpired() {
    let expiresIn =localStorage.getItem("tokenExpiresIn");
    return expiresIn == null || (Date.now() - Number.parseInt(expiresIn) > 0); 
  }

  isRefreshExpired() {
    let expiresIn =localStorage.getItem("refreshExpiresIn");
    return expiresIn == null || (Date.now() - Number.parseInt(expiresIn) > 0); 
  }

  private getToken() {
    return localStorage.getItem("token");
  }

  private getRefresh() {
    return localStorage.getItem("refresh");
  }

  private copyTokenToLocalStorage(token: Token) {
    let expiresIn = Date.now() + (token.expires_in * 1000);
    let refreshExpiresIn = Date.now() + (token.refresh_expires_in * 1000);

    localStorage.setItem("token", token.access_token);
    localStorage.setItem("tokenExpiresIn", expiresIn.toString());
    localStorage.setItem("refresh", token.refresh_token);
    localStorage.setItem("refreshExpiresIn", refreshExpiresIn.toString());
  }

  private clearTokenInfos() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiresIn");
    localStorage.removeItem("refresh");
    localStorage.removeItem("refreshExpiresIn");
  }
}
