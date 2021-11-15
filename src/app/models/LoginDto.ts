import { UserDto } from "./UserDto";

export interface LoginDto {
    user: UserDto;
    token: string;
}