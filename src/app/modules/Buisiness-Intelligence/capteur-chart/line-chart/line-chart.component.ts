import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CapteurHistory } from "src/app/models/CapteurHistory";
import { CapteurValueService } from "../../../../services/capteur-value.service";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
})
export class LineChartComponent implements OnInit, OnDestroy {
  basicData: any;
  basicOptions: any;
  datasets: any[] = [];

  xData: any[] = [];
  yData: DoubleRange[] = [];

  capteurHistorySubscription = new Subscription();
  capteurHistories: CapteurHistory[][] = [];

  constructor(private capteurValueService: CapteurValueService) {}

  ngOnInit() {
    this.subscribeCapteurHistories();
  }

  ngOnDestroy() {
    this.capteurHistorySubscription.unsubscribe();
    this.capteurValueService.resetCapteurHistory();
  }

  subscribeCapteurHistories() {
    this.capteurHistorySubscription = this.capteurValueService.capteurHistoriesSubject.subscribe(
      (value) => {
        this.capteurHistories = value;
        this.constructData();
      },
      (error) => {
        console.log("Error on capteurHistorySubscription ");
      }
    );
  }

  constructData() {
    this.datasets = [];

    this.capteurHistories.forEach((element) => {
      this.xData = [];
      this.yData = [];
      element.forEach((capteurHistory) => {
        this.xData.push(capteurHistory.dateReleve);
        this.yData.push(capteurHistory.capteurValue);
      });

      this.datasets.push({
        label: "Capteur " + element[0].capteurNom,
        data: this.yData,
        fill: false,
        borderColor:
          "#" + ("000000" + Math.floor(0x1000000 * Math.random()).toString(16)).slice(-6),
        tension: 0.4,
      });
    });

    this.basicData = {
      labels: this.xData,
      datasets: this.datasets,
    };
  }
}
