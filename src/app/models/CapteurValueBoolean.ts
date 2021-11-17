import { Timestamp } from "rxjs/internal/operators/timestamp";
import { Capteur } from "./Capteur";

export interface CapteurValueBoolean {
  capteurValueId: number;
  capteurBooleanValue: boolean;
  machineId: number;
  dateReleve: Date;
  capteur: Capteur;
}
