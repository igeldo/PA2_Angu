import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Token } from "@conciso/auth";

/**
 * @description
 * @class
 */
@Injectable({providedIn: 'root'})
export class AuthApi {

  private readonly url = "http://localhost:8081/realms/java-starter-realm/protocol/openid-connect/token";

  constructor(private http: HttpClient) { }

  acquireToken(username: string, password: string) {
    let params = this.getTokenHttpParams(username, password);
    let options = this.getHttpOptions();

    return this.http.post<Token>(this.url, params, options);
  }

  acquireTokenWithRefresh(refreshToken: string) {
    let params = this.getRefreshHttpParams(refreshToken);
    let options = this.getHttpOptions();

    return this.http.post<Token>(this.url, params, options);
  }

  private getRefreshHttpParams(refreshToken: string) {
    return new HttpParams({
      fromObject: {
        grant_type: "refresh_token",
        client_id: "java-starter-client",
        refresh_token: refreshToken
      }
    })
  }

  private getTokenHttpParams(username: string, password: string) {
    return new HttpParams({
      fromObject: {
        grant_type: "password",
        client_id: "java-starter-client",
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
