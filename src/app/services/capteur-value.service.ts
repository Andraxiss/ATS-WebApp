import { HttpClient } from "@angular/common/http";
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
  capteurValues: CapteurValue[] = [];
  capteurValuesBoolean: CapteurValueBoolean[] = [];
  capteurHistories: CapteurHistory[][] = [];
  availableCapteurs: Capteur[] = [];

  capteurValuesSubject = new Subject<CapteurValue[]>();
  capteurValuesBooleanSubject = new Subject<CapteurValueBoolean[]>();
  capteurHistoriesSubject = new Subject<CapteurHistory[][]>();
  availableCapteursSubject = new Subject<Capteur[]>();

  constructor(private http: HttpClient) {}

  emitCapteurValuesSubject() {
    this.capteurValuesSubject.next(this.capteurValues.slice());
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
      this.controllerName + "/capteurs-values/machines/" + machineId + "/last-values";
    this.http.get<CapteurValue[]>(endPoint).subscribe(
      (value) => {
        this.capteurValues = value;
        this.emitCapteurValuesSubject();
      },
      (error) => {
        console.log("Error on getting last values");
      }
    );
  }

  getLastValueBoolean(machineId: number) {
    const endPoint = this.controllerName + "/capteurs-values-boolean/" + machineId + "/last-values";
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

  getCapteurHistory(machineId: number, capteurId: number) {
    const endPoint =
      this.controllerName +
      "/capteurs-values/machines/" +
      machineId +
      "/capteurs/" +
      capteurId +
      "/history";
    this.http.get<CapteurHistory[]>(endPoint).subscribe(
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

  removeCapteurHistory(capteurId: number) {
    let indexToRemove = this.capteurHistories.findIndex((v) => v[0].capteur_id === capteurId);

    if (indexToRemove > -1) {
      this.capteurHistories.splice(indexToRemove);
      this.emitcapteurHistoriesSubject();
    }
  }

  getCapteursAvailable(machineId: number) {
    this.availableCapteurs = [];
    const endPoint = this.controllerName + "/capteurs-values/machines/" + machineId + "/available";
    this.http.get<Capteur[]>(endPoint).subscribe(
      (value) => {
        this.availableCapteurs = value;
        this.emitavailableCapteursSubject();
      },
      (error) => {
        console.log("Error on getting available sensor for " + machineId + " machine");
      }
    );
  }

  resetCapteurHistory() {
    this.capteurHistories = [];
  }
}
