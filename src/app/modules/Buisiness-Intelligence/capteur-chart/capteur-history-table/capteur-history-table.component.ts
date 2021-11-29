import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CapteurHistory } from "src/app/models/CapteurHistory";
import { CapteurValueService } from "src/app/services/capteur-value.service";

@Component({
  selector: "app-capteur-history-table",
  templateUrl: "./capteur-history-table.component.html",
  styleUrls: ["./capteur-history-table.component.scss"],
})
export class CapteurHistoryTableComponent implements OnInit {
  products: String[] = [];
  constructor(private capteurValueService: CapteurValueService) {}

  capteurHistorySubscription = new Subscription();
  capteurHistories: CapteurHistory[][] = [];
  capteursNom: String[] = [];

  ngOnInit(): void {
    this.subscribeCapteurHistories();
  }

  ngOnDestroy() {
    this.capteurHistorySubscription.unsubscribe();
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  subscribeCapteurHistories() {
    this.capteurHistorySubscription =
      this.capteurValueService.capteurHistoriesSubject.subscribe(
        (value) => {
          this.capteurHistories = value;
          this.capteursNom = [];
          this.capteursNom.push("Date de relevé");
          this.capteurHistories.forEach((e) => {
            this.capteursNom.push(e[0].capteurNom);
          });
        },
        (error) => {
          console.log("Error on capteurHistorySubscription in array ");
        }
      );
  }
}
