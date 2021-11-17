import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ValueConverter } from "@angular/compiler/src/render3/view/template";
import { CapteurValue } from "../models/CapteurValue";
import { Injectable } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { CapteurValueBoolean } from "../models/CapteurValueBoolean";

@Injectable({
  providedIn: "root",
})
export class CapteurValueService {
  public controllerName = environment.apiURL + "/bi";
  capteurValues: CapteurValue[] = [];
  capteurValuesBoolean: CapteurValueBoolean[] = [];
  capteurValuesSubject = new Subject<CapteurValue[]>();
  capteurValuesBooleanSubject = new Subject<CapteurValueBoolean[]>();

  constructor(private http: HttpClient) {}

  emitCapteurValuesSubject() {
    console.log(this.capteurValues);
    this.capteurValuesSubject.next(this.capteurValues.slice());
  }

  emitCapteurValuesBooleanSubject() {
    this.capteurValuesBooleanSubject.next(this.capteurValuesBoolean.slice());
  }

  getLastValue(machineId: number) {
    const endPoint = this.controllerName + "/capteurs-values/" + machineId + "/last-values";
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
}
