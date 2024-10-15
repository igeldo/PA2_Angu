import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "@conciso/auth";
import { Observable, catchError, firstValueFrom, from, lastValueFrom, map, mergeMap, of, switchMap, tap, throwError } from "rxjs";

/**
 * @description
 * @class
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // konvertieren von Promise zu observable
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    // token Anfragen nicht abfangen
    if(req.url.includes("token"))
      return lastValueFrom(next.handle(req));

    // token expired refresh valid
    if(this.authService.isTokenExpired() && !this.authService.isRefreshExpired()) {
      await firstValueFrom(this.authService.acquireTokenByRefresh())
    }

    let request = req.clone({
      setHeaders: this.authService.getAuthHeader()
    });

    return lastValueFrom(next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status == HttpStatusCode.Unauthorized)
          this.authService.logout();

        return throwError(() => err);
      })
    ));
  }
}
