import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Auftrag, AuftragList } from "@conciso/auftrag";

/**
 * @description
 * @class
 */
@Injectable({ providedIn: 'root'})
export class AuftragApi { 

  private readonly url = "http://localhost:8080/api/shop/auftrag";

  constructor(private client: HttpClient) {}

  create(auftrag: Auftrag) {
    return this.client.post<Auftrag>(this.url, auftrag);
  }
  
  getById(id: string) {
    return this.client.get<Auftrag>(`${this.url}/${id}`);
  }

  getAll() {
    return this.client.get<AuftragList>(this.url);
  }
}