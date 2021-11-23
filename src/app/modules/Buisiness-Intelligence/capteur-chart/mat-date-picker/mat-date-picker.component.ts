import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatInput } from "@angular/material/input";
import { CapteurValueService } from "../../../../services/capteur-value.service";

@Component({
  selector: "app-mat-date-picker",
  templateUrl: "./mat-date-picker.component.html",
  styleUrls: ["./mat-date-picker.component.scss"],
})
export class MatDatePickerComponent implements OnInit {
  dateHint?: String;
  @Input()
  machineId!: number;
  @Input()
  dateType!: String;

  @ViewChild("formInput", {
    read: MatInput,
  })
  formInput!: MatInput;

  constructor(private capteurValueService: CapteurValueService) {}

  ngOnInit(): void {
    if (this.dateType === "startDate") {
      this.dateHint = "Date de début";
    } else {
      this.dateHint = "Date de fin";
    }
  }
  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      if (this.dateType === "startDate") {
        this.capteurValueService.startDate = event.value;
      } else {
        this.capteurValueService.endDate = event.value;
      }
    }

    this.capteurValueService.onDateChange(this.machineId);
  }

  resetDate() {
    this.formInput.value = "";
  }
}
