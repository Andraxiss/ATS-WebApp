import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CapteurType } from "src/app/enum/capteur_type.enum";
import { CapteurValue } from "src/app/models/CapteurValue";
import { CapteurValueBoolean } from "src/app/models/CapteurValueBoolean";
import { CapteurValueService } from "src/app/services/capteur-value.service";

@Component({
  selector: "app-last-capteur-value",
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

  date: string = "";
  title: string = "";
  subTitle: string = "";

  constructor(
    private http: HttpClient,
    private capteurValueService: CapteurValueService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscribeValues();
    this.machineId = this.route.snapshot.params["machineId"];
    this.loadData(this.machineId);
  }

  ngOnDestroy() {
    this.capteurValueSubscription.unsubscribe();
    this.capteurValueBooleanSubscription.unsubscribe();
  }

  loadData(machineId: number) {
    if (this.route.snapshot.url.toString().split(",").pop() === "last-value") {
      this.date = "LAST";
      this.title = "Dernier relevé des capteurs pour la machine";
      this.subTitle = "Date du dernier relevé :";
    } else {
      this.route.queryParams.subscribe((params) => {
        this.date = params["date"];
        this.title = "Relevé des capteurs pour la machine";
        this.subTitle = "Date du relevé :";
      });
    }

    this.capteurValueService.getValueByDate(machineId, this.date);
    this.capteurValueService.getValueBoolean(machineId, this.date);
  }

  subscribeValues() {
    this.capteurValueSubscription =
      this.capteurValueService.capteurValuesSubject.subscribe(
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
