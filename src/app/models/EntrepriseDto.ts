import { MachineDto } from "./MachineDto";

export interface EntrepriseDto {
    entrepriseId?: number;
    nom?: string;
    adresse?: string;
    siret?: string;
    machines?: MachineDto[];
}