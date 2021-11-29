import { Capteur } from "./Capteur";
import { Machine } from "./Machine";

export interface CapteurValue {
  capteurValueId: number;
  capteurValue: DoubleRange;
  machine: Machine;
  dateReleve: Date;
  capteur: Capteur;
}
