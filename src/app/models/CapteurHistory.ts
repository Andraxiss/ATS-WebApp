import { Machine } from "./Machine";
export interface CapteurHistory {
  capteurValueId: number;
  capteurValue: DoubleRange;
  machine: Machine;
  capteurId: number;
  dateReleve: Date;
  capteurNom: string;
}
