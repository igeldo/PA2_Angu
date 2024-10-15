import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, delay, filter, finalize, tap } from "rxjs";
import { LoadingService } from "../loading.service";

/**
 * @description Shows loading circle when performing a http request 
 * @class
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.loadingService.setLoadingStatus(true);
    
    return next.handle(req).pipe(
      filter(x => HttpEventType.Response == x.type),
      delay(1000),
      tap(x => console.log(x)),
      finalize(() => this.loadingService.setLoadingStatus(false))
    );
  }
}
