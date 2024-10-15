import { Component } from '@angular/core';

// Component-Decorator zu verknüpfung von Styling, Code und HTML,
// sowie Konfigurationsdaten 
// (Bsp.: Selector beschreib, wie eine Komponente in HTML referenziert werden kann)
@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
// Typescript Klasse für Implementierung
export class AppComponent {

  // Änderungen werden zur Laufzeit akutualisiert
  alertMsg: string = "Die Methode funktioniert!";

  /*
    *  Diese Funktion löst einen Alert aus
    */
  showAlert(): void {
    alert(this.alertMsg);
  }
}
