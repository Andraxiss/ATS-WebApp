import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-mat-date-picker",
  templateUrl: "./mat-date-picker.component.html",
  styleUrls: ["./mat-date-picker.component.scss"],
})
export class MatDatePickerComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  constructor() {}

  ngOnInit(): void {}
}
