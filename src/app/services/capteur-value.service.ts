import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Capteur } from "../models/Capteur";
import { CapteurHistory } from "../models/CapteurHistory";
import { CapteurValue } from "../models/CapteurValue";
import { CapteurValueBoolean } from "../models/CapteurValueBoolean";

@Injectable({
  providedIn: "root",
})
export class CapteurValueService {
  public controllerName = environment.apiURL + "/bi";
  capteurLastValues: CapteurValue[] = [];
  capteurValuesBoolean: CapteurValueBoolean[] = [];
  capteurHistories: CapteurHistory[][] = [];
  availableCapteurs: Capteur[] = [];
  chosenCapteurIds: number[] = [];
  startDate: Date = new Date();
  endDate: Date = new Date();

  capteurValuesSubject = new Subject<CapteurValue[]>();
  capteurValuesBooleanSubject = new Subject<CapteurValueBoolean[]>();
  capteurHistoriesSubject = new Subject<CapteurHistory[][]>();
  availableCapteursSubject = new Subject<Capteur[]>();

  constructor(private http: HttpClient) {}

  loadCapteurHistory(machineId: number, capteurId: number) {
    //Load data to be displayed on chart
    var params = new HttpParams();
    var today: Date = new Date();
    console.log(
      "🚀 ~ file: capteur-value.service.ts ~ line 35 ~ CapteurValueService ~ loadCapteurHistory ~ chosenCapteurIds",
      this.chosenCapteurIds
    );
    if (!this.chosenCapteurIds.includes(capteurId)) {
      this.chosenCapteurIds.push(+capteurId);
    }
    if (this.startDate.getDate() !== today.getDate()) {
      params = params.set("startTime", this.startDate.toISOString());
    }
    if (this.endDate.getDate() !== today.getDate()) {
      params = params.set("endTime", this.endDate.toISOString());
    }
    this.getCapteurHistory(machineId, capteurId, params);
  }

  removeCapteurHistory(capteurId: number) {
    //Remove a sensor from chart
    let indexToRemoveChosenCapteurIds = this.chosenCapteurIds.findIndex(
      (v) => v === capteurId
    );
    if (indexToRemoveChosenCapteurIds > -1) {
      this.chosenCapteurIds.splice(indexToRemoveChosenCapteurIds, 1);
    }

    let indexToRemoveCapteurHistories = this.capteurHistories.findIndex(
      (v) => v[0].capteurId === capteurId
    );
    if (indexToRemoveCapteurHistories > -1) {
      this.capteurHistories.splice(indexToRemoveCapteurHistories, 1);
      this.emitcapteurHistoriesSubject();
    }
  }

  resetCapteurHistory() {
    //Reset all datas when chart is closed
    this.capteurHistories = [];
  }

  onDateChange(machineId: number) {
    //Handle new chosen date by user
    this.resetCapteurHistory();
    if (this.startDate !== new Date()) {
      this.chosenCapteurIds.forEach((capteurId) => {
        this.loadCapteurHistory(machineId, capteurId);
      });
    }
  }

  emitCapteurValuesSubject() {
    this.capteurValuesSubject.next(this.capteurLastValues.slice());
  }

  emitavailableCapteursSubject() {
    this.availableCapteursSubject.next(this.availableCapteurs.slice());
  }

  emitcapteurHistoriesSubject() {
    this.capteurHistoriesSubject.next(this.capteurHistories.slice());
  }

  emitCapteurValuesBooleanSubject() {
    this.capteurValuesBooleanSubject.next(this.capteurValuesBoolean.slice());
  }

  getLastValue(machineId: number) {
    const endPoint =
      this.controllerName +
      "/capteurs-values/machines/" +
      machineId +
      "/last-values";
    this.http.get<CapteurValue[]>(endPoint).subscribe(
      (value) => {
        this.capteurLastValues = value;
        this.emitCapteurValuesSubject();
      },
      (error) => {
        console.log("Error on getting last values");
      }
    );
  }

  getLastValueBoolean(machineId: number) {
    const endPoint =
      this.controllerName +
      "/capteurs-values-boolean/" +
      machineId +
      "/last-values";
    this.http.get<CapteurValueBoolean[]>(endPoint).subscribe(
      (value) => {
        this.capteurValuesBoolean = value;
        this.emitCapteurValuesBooleanSubject();
      },
      (error) => {
        console.log("Error on getting last boolean values");
      }
    );
  }

  getCapteurHistory(machineId: number, capteurId: number, params: HttpParams) {
    const endPoint =
      this.controllerName +
      "/capteurs-values/machines/" +
      machineId +
      "/capteurs/" +
      capteurId +
      "/history";
    this.http.get<CapteurHistory[]>(endPoint, { params: params }).subscribe(
      (value) => {
        const lastIndexCapteur = this.capteurHistories.length;
        this.capteurHistories[lastIndexCapteur] = value;
        this.emitcapteurHistoriesSubject();
      },
      (error) => {
        console.log("Error on getting sensor " + capteurId + " history");
      }
    );
  }

  getCapteursAvailable(machineId: number) {
    this.availableCapteurs = [];
    const endPoint =
      this.controllerName +
      "/capteurs-values/machines/" +
      machineId +
      "/available";
    this.http.get<Capteur[]>(endPoint).subscribe(
      (value) => {
        this.availableCapteurs = value;
        this.emitavailableCapteursSubject();
      },
      (error) => {
        console.log(
          "Error on getting available sensor for " + machineId + " machine"
        );
      }
    );
  }
}
