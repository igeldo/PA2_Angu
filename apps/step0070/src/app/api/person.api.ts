import { Injectable } from "@angular/core";
import { ENV } from "./environments/environment";
import { HttpClient } from "@angular/common/http";
import { Person } from "../../assets/person";

/**
 * @description
 * @class
 */
@Injectable({providedIn: 'root'})
export class PersonApi {

  private readonly url = `${ENV.apiBaseUrl}/person`;

  constructor(private http: HttpClient) { }

  createPerson(person: FormData) {
    return this.http.post<Person>(this.url, person);
  }

  getById(id: number) {
    return this.http.get<Person>(`${this.url}/${id}`);
  }
}
