import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { Router } from "@angular/router";
import { Routes } from "../../assets/route-enumeration";
import { AuthApi } from "../api/auth.api";

/**
 * @description
 * @class
 */
@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private authApi: AuthApi, 
    private router: Router
  ) { }

  login(username: string, password: string) {
    this.authApi.acquireToken(username, password)
      .pipe(
        tap((token) => this.copyTokenToLocalStorage(token.access_token))
      ).subscribe({
        complete: () => this.router.navigate([`/${Routes.SHOPPING}`]),
        error: (err) => console.error(err)
      });
  }

  logout() {
    this.clearToken();
    this.router.navigate([`/${Routes.LOGIN}`]);
  }

  getAuthHeader() {
    let token = this.getToken();

    return {
      Authorization: `Bearer ${token}`
    }
  }

  isAuthenticated() {
    return this.getToken() != null;
  }

  private getToken() {
    return localStorage.getItem("token");
  }

  private copyTokenToLocalStorage(token: string) {
    localStorage.setItem("token", token);
  }

  private clearToken() {
    localStorage.removeItem("token");
  }
}
