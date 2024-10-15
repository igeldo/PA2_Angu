import { Injectable } from "@angular/core";
import { ENV } from "./environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Token } from "../../assets/token";

/**
 * @description
 * @class
 */
@Injectable({providedIn: 'root'})
export class AuthApi {

  private readonly url = ENV.tokenUrl;

  constructor(private http: HttpClient) { }

  acquireToken(username: string, password: string) {
    let params = this.getHttpParams(username, password);
    let options = this.getHttpOptions();

    return this.http.post<Token>(this.url, params, options);
  }

  private getHttpParams(username: string, password: string) {
    return new HttpParams({
      fromObject: {
        grant_type: ENV.auth.grant_type,
        client_id: ENV.auth.client_id,
        username: username,
        password: password
      }
    })
  }

  private getHttpOptions() {
    return { 
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
  }
}
