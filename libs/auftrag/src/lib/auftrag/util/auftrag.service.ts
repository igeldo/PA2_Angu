import { Injectable, signal } from "@angular/core";
import { AuftragApi } from "../data-access/data-access-auftrag.api";
import { PersonService } from "@conciso/person";
import { ShoppingCartService } from "@conciso/artikel";
import { Auftrag } from "@conciso/auftrag";
import { of, switchMap, tap } from "rxjs";

/**
 * @description
 * @class
 */
@Injectable({ providedIn: 'root'})
export class AuftragService {

  historySignal = signal<Auftrag[]>([]);

  constructor(
    private auftragApi: AuftragApi,
    private personService: PersonService,
    private artikelService: ShoppingCartService
  ) { }

  createAuftrag() {
    this.personService.createUserAndAddress().pipe(
      switchMap(person => of(this.buildAuftrag(person.id))),
      switchMap(auftrag => this.auftragApi.create(auftrag)),
      tap(_ => this.artikelService.resetCartList()),
      tap(_ => this.personService.resetForm())
    ).subscribe({
      error: (err) => this.personService.resetForm()
    });
  }

  getAllAuftraege() {
    this.auftragApi.getAll().pipe(
      tap(list => this.historySignal.set(list.auftragList)),
    ).subscribe();
  }

  private buildAuftrag(personId: string) {
    let artikel = this.artikelService.mapItemsToArtikels();
    return {
      personId: personId,
      bestellNummer: this.generateRandomNumber(),
      artikel: artikel
    } as Auftrag;
  }

  private generateRandomNumber() {
    return Math.floor(Math.random() * 100).toString();
  }
}
