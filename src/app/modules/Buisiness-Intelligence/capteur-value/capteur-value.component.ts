import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CapteurType } from "src/app/enum/capteur_type.enum";
import { Capteur } from "src/app/models/Capteur";
import { CapteurValue } from "src/app/models/CapteurValue";
import { CapteurValueBoolean } from "src/app/models/CapteurValueBoolean";
import { CapteurValueService } from "src/app/services/capteur-value.service";

@Component({
  selector: "app-capteur-value",
  templateUrl: "./capteur-value.component.html",
  styleUrls: ["./capteur-value.component.scss"],
})
export class CapteurValueComponent implements OnInit, OnDestroy {
  capteurType = CapteurType;
  machineId: number = 0;
  capteurValues: CapteurValue[] = [];
  capteurValuesBoolean: CapteurValueBoolean[] = [];
  capteurValueSubscription = new Subscription();
  capteurValueBooleanSubscription = new Subscription();

  constructor(
    private http: HttpClient,
    private capteurValueService: CapteurValueService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscribeValues();
    this.machineId = this.route.snapshot.params["id"];
    this.loadData(this.machineId);
  }

  ngOnDestroy() {
    this.capteurValueSubscription.unsubscribe();
    this.capteurValueBooleanSubscription.unsubscribe();
  }

  loadData(machineId: number) {
    this.capteurValueService.getLastValue(machineId);
    this.capteurValueService.getLastValueBoolean(machineId);
  }

  subscribeValues() {
    this.capteurValueSubscription = this.capteurValueService.capteurValuesSubject.subscribe(
      (value) => {
        this.capteurValues = value;
      },
      (error) => {
        console.error("Error on subscription values");
      }
    );

    this.capteurValueBooleanSubscription =
      this.capteurValueService.capteurValuesBooleanSubject.subscribe(
        (value) => {
          this.capteurValuesBoolean = value;
        },
        (error) => {
          console.error("Error on subscription boolean values");
        }
      );
  }
}
