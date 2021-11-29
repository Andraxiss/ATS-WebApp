import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Capteur } from "src/app/models/Capteur";
import { CapteurValueService } from "src/app/services/capteur-value.service";
import { MatDatePickerComponent } from "./mat-date-picker/mat-date-picker.component";

@Component({
  selector: "capteur-chart",
  styleUrls: ["./capteur-chart.component.scss"],
  templateUrl: "./capteur-chart.component.html",
})
export class CapteurChartComponent implements OnInit, OnDestroy {
  machineId: number = 0;
  capteurId: number = 0;
  isAvailableCapteur: boolean = false;
  currentCapteur!: Capteur;
  availableCapteurs: Capteur[] = [];
  availableCapteursSubscription = new Subscription();

  @ViewChildren(MatDatePickerComponent)
  datePickers!: QueryList<MatDatePickerComponent>;

  constructor(private capteurValueService: CapteurValueService, private route: ActivatedRoute) {}

  ngOnInit() {
    //this.startDate = this.capteurValueService.capteurHistories[0][0].dateReleve;
    this.machineId = this.route.snapshot.params["machineId"];
    this.capteurId = this.route.snapshot.params["capteurId"];
    this.loadData(this.machineId, this.capteurId);
  }

  ngOnDestroy() {}

  loadData(machineId: number, capteurId: number) {
    this.capteurValueService.loadCapteurHistory(machineId, capteurId);
    this.capteurValueService.getCapteursAvailable(machineId);
    this.subscribeAvailableCapteurs();
  }

  resetDate() {
    this.datePickers.forEach((element) => {
      element.resetDate();
    });
    this.capteurValueService.startDate = new Date();
    this.capteurValueService.endDate = new Date();
    this.capteurValueService.onDateChange(this.machineId);
  }
  subscribeAvailableCapteurs() {
    this.availableCapteursSubscription =
      this.capteurValueService.availableCapteursSubject.subscribe(
        (value) => {
          this.currentCapteur = value.filter((v) => v.capteurId == this.capteurId)[0];
          this.availableCapteurs = value.filter(
            (v) => v.capteurType == this.currentCapteur.capteurType
          );
          this.isAvailableCapteur = true;
        },
        (error) => {
          console.log("Error on subscription of available capteurs");
        }
      );
  }
}
