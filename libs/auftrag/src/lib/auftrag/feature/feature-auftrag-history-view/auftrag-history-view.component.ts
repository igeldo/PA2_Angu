import { Component, OnInit } from "@angular/core";
import { AuftragService } from "../../util/auftrag.service";
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { Auftrag } from "@conciso/auftrag";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [    
    TableModule,
    SidebarModule
  ],
  templateUrl: './auftrag-history-view.component.html',
  styleUrl: './auftrag-history-view.component.css',
})
export class AuftragHistoryComponent implements OnInit{

  sidebarVisible = false;
  historySignal = this.auftragService.historySignal;

  selectedArtikel = [];
  selectedAuftrag : Auftrag | null = null;

  constructor(private auftragService: AuftragService) {}

  onSelectionChange(event: any) {
    this.selectedAuftrag = event;
    this.sidebarVisible = event != null;
    if(event != null) {
      this.selectedArtikel = event.artikel;
    }
  }

  onclose() {
    this.selectedArtikel = [];
    this.selectedAuftrag = null;
  }

  ngOnInit(): void {
    this.auftragService.getAllAuftraege();
  }

}
