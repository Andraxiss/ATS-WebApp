import { RoleDto } from "./RoleDto";

export interface UserDto {
    userId?:number;
    nom?: string;
    password_hash?: string;
    email?: string;
    prenom?: string;
    poste?: string;
    roles?: RoleDto[];
}