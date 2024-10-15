import { Injectable, signal } from "@angular/core";

/**
 * @description
 * @class
 */
@Injectable({providedIn: 'root'})
export class LoadingService {

  isLoadingSignal = signal(false);

  constructor() {}

  setLoadingStatus(status: boolean) {
    this.isLoadingSignal.set(status);
  }
}
