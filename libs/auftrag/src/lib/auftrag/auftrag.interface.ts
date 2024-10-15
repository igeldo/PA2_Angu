import { Artikel } from "@conciso/artikel";

export interface Auftrag {
  id: number;
  personId: string;
  bestellNummer: string;
  artikel: Artikel[];
} 