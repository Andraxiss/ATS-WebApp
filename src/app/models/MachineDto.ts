import { CapteurValue } from "./CapteurValue";
import { EntrepriseDto } from "./EntrepriseDto";

export interface MachineDto {
    machineId?:number;
    nom?: string;
    capteurValues?: CapteurValue[];
    entreprise?:EntrepriseDto;
}