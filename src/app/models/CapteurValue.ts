import { Capteur } from "./Capteur";

export interface CapteurValue {
  capteur_value_id: number;
  capteur_value: DoubleRange;
  machine_id: number;
  date_releve: Date;
  capteur: Capteur;
}
