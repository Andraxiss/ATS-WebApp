import { Capteur } from "./Capteur";
import { Machine } from "./Machine";

export interface CapteurValueBoolean {
  capteurValueId: number;
  capteurBooleanValue: boolean;
  machine: Machine;
  dateReleve: Date;
  capteur: Capteur;
}
