import { CapteurValue } from "./CapteurValue";

export interface MachineDto {
    machineId?:number;
    nom?: string;
    capteurValues?: CapteurValue[];
}