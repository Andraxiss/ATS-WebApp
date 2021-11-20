import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Capteur } from "src/app/models/Capteur";
import { CapteurValueService } from "src/app/services/capteur-value.service";

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

  constructor(private capteurValueService: CapteurValueService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.machineId = this.route.snapshot.params["machineId"];
    this.capteurId = this.route.snapshot.params["capteurId"];
    this.loadData(this.machineId, this.capteurId);
  }

  ngOnDestroy() {}

  loadData(machineId: number, capteurId: number) {
    this.capteurValueService.getCapteurHistory(machineId, capteurId);
    this.capteurValueService.getCapteursAvailable(machineId);
    this.subscribeAvailableCapteurs();
  }

  subscribeAvailableCapteurs() {
    this.availableCapteursSubscription =
      this.capteurValueService.availableCapteursSubject.subscribe(
        (value) => {
          this.currentCapteur = value.filter((v) => v.capteur_id == this.capteurId)[0];
          this.availableCapteurs = value.filter(
            (v) => v.capteur_type == this.currentCapteur.capteur_type
          );
          this.isAvailableCapteur = true;
        },
        (error) => {
          console.log("Error on subscription of available capteurs");
        }
      );
  }
}
