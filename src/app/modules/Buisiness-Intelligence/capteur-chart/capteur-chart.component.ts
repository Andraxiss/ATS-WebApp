import { Component, OnInit } from "@angular/core";
import { Chart } from "node_modules/chart.js";

@Component({
  selector: "app-capteur-chart",
  templateUrl: "./capteur-chart.component.html",
  styleUrls: ["./capteur-chart.component.scss"],
})
export class CapteurChartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let ctx = document.getElementById("capteurChart");
    let myChart = new Chart(ctx, {});
  }
}
