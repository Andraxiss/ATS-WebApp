import { Capteur } from "./Capteur";

export interface CapteurValueBoolean {
  capteur_value_id: number;
  capteur_boolean_value: boolean;
  machine_id: number;
  date_releve: Date;
  capteur: Capteur;
}
