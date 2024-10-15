import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { Observable, catchError, of, throwError } from "rxjs";

/**
 * @description
 * @class
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!this.authService.isAuthenticated()) {
      this.authService.logout();
      return next.handle(req);
    }

    let request = req.clone({
      setHeaders: this.authService.getAuthHeader()
    });

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status == HttpStatusCode.Unauthorized)
          this.authService.logout();

        return throwError(() => err);
      })
    );
  }
}
