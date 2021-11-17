import { Timestamp } from "rxjs/internal/operators/timestamp";
import { Capteur } from "./Capteur";

export interface CapteurValue {
  capteurValueId: number;
  capteurValue: DoubleRange;
  machineId: number;
  dateReleve: Date;
  capteur: Capteur;
}
