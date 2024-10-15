import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, delay, filter, finalize, tap, timeout } from "rxjs";
import { LoadingService } from "../loading.service";

/**
 * @description
 * @class
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  /**
   * Shows loading circle when performing a http request 
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.loadingService.setLoadingStatus(true);
    
    return next.handle(req).pipe(
      filter(x => HttpEventType.Response == x.type ),
      finalize(() => this.loadingService.setLoadingStatus(false))
    );
  }
}
