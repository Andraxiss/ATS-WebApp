import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { ToastrService } from "ngx-toastr";
import { Capteur } from "src/app/models/Capteur";
import { CapteurValueService } from "../../../../services/capteur-value.service";

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

  constructor(
    private capteurValueService: CapteurValueService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.availableCapteurs.forEach((c) => {
      this.availableCapteursNames.push(c.capteurNom);
    });
    this.toBePrintedCapteurName.push(this.currentCapteur.capteurNom);
  }

  add(event: MatChipInputEvent): void {
    //Launch when capteur is written
    const value = (event.value || "").trim();
    if (value) {
      if (!this.toBePrintedCapteurName.includes(value)) {
        this.toBePrintedCapteurName.push(value);
        this.addNewCapteurToChart(value);
      } else {
        this.toastr.error("Ce capteur à déjà été choisi");
      }
    }

    // Clear the input value
    event.chipInput!.clear();
    this.capteurCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    //Launch when capteur selected by click
    if (event.option.viewValue) {
      if (!this.toBePrintedCapteurName.includes(event.option.viewValue)) {
        this.toBePrintedCapteurName.push(event.option.viewValue);
        this.addNewCapteurToChart(event.option.viewValue);
      } else {
        this.toastr.error("Ce capteur à déjà été choisi");
      }
    }

    this.capteurInput.nativeElement.value = "";
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
    let capteurIdToPrint = this.availableCapteurs.filter(
      (v) => v.capteurNom === capteurName
    )[0].capteurId;
    if (this.capteurValueService.capteurHistories[0].length == 0) {
      this.capteurValueService.capteurHistories = [];
    }
    this.capteurValueService.loadCapteurHistory(
      this.machineId,
      capteurIdToPrint
    );
  }

  removeCapteurFromChart(capteurName: String) {
    let capteurIdToremove = this.availableCapteurs.filter(
      (v) => v.capteurNom === capteurName
    )[0].capteurId;
    this.capteurValueService.removeCapteurHistory(capteurIdToremove);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.availableCapteursNames.filter((capteur) =>
      capteur.toLowerCase().includes(filterValue)
    );
  }
}
