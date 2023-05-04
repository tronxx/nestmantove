import { IsNumber, IsInt, IsString, IsEmail } from "class-validator";

export class CreateUsuariosDto {

    @IsString()
    login: string;

    @IsString()
    nombre: string;

    @IsEmail()
    email: string;

    @IsString()
    clave: string;

    @IsString()
    maestro: string;

    @IsString()
    numpol: string;

    @IsString()
    iniciales: string;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}