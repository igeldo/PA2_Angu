import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Address, Person } from "@conciso/person";

/**
 * @description
 * @class
 */
@Injectable({providedIn: 'root'})
export class PersonApi {

  private readonly url = "http://localhost:8080/api/shop/person";

  constructor(private http: HttpClient) { }

  createPerson(person: Person) {
    return this.http.post<Person>(this.url, person);
  }

  createAddress(personId: string, address: Address) {
    return this.http.post<Person>(`${this.url}/${personId}/address`, address);
  }

  getById(id: number) {
    return this.http.get<Person>(this.url+"/"+id);
  }
}
