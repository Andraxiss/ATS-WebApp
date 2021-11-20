import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Capteur } from "src/app/models/Capteur";
import { CapteurValueService } from "../../../services/capteur-value.service";

@Component({
  selector: "app-mat-chips-autocomplete",
  templateUrl: "./mat-chips-autocomplete.component.html",
  styleUrls: ["./mat-chips-autocomplete.component.scss"],
})
export class MatChipsAutocompleteComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  capteurCtrl = new FormControl();

  @Input()
  capteurId!: number;
  @Input()
  machineId!: number;
  @Input()
  currentCapteur!: Capteur;
  @Input()
  availableCapteurs: Capteur[] = [];
  availableCapteursNames: string[] = [];
  toBePrintedCapteurName: string[] = [];

  @ViewChild("capteurInput") capteurInput!: ElementRef<HTMLInputElement>;

  constructor(private capteurValueService: CapteurValueService) {}

  ngOnInit(): void {
    this.availableCapteurs.forEach((c) => {
      this.availableCapteursNames.push(c.capteur_nom);
    });
    this.toBePrintedCapteurName.push(this.currentCapteur.capteur_nom);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();
    // Add our fruit
    if (value) {
      this.toBePrintedCapteurName.push(value);
    }
    this.addNewCapteurToChart(value);
    // Clear the input value
    event.chipInput!.clear();
    this.capteurCtrl.setValue(null);
  }

  remove(capteurName: string): void {
    const index = this.toBePrintedCapteurName.indexOf(capteurName);

    if (index >= 0) {
      this.toBePrintedCapteurName.splice(index, 1);
      this.removeCapteurFromChart(capteurName);
    }
  }

  addNewCapteurToChart(capteurName: String) {
    let capteurIdToPrint = this.availableCapteurs.filter((v) => v.capteur_nom === capteurName)[0]
      .capteur_id;
    this.capteurValueService.getCapteurHistory(this.machineId, capteurIdToPrint);
  }

  removeCapteurFromChart(capteurName: String) {
    let capteurIdToremove = this.availableCapteurs.filter((v) => v.capteur_nom === capteurName)[0]
      .capteur_id;
    this.capteurValueService.removeCapteurHistory(capteurIdToremove);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.toBePrintedCapteurName.push(event.option.viewValue);
    this.addNewCapteurToChart(event.option.viewValue);
    this.capteurInput.nativeElement.value = "";
    this.capteurCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.availableCapteursNames.filter((capteur) =>
      capteur.toLowerCase().includes(filterValue)
    );
  }
}
