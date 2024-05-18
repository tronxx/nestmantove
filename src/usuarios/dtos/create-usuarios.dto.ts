import { IsNumber, IsInt, IsString, IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateUsuariosDto {

    @IsString()
    login: string;

    @IsString()
    nombre: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    clave: string;

    @IsString()
    maestro: string;

    @IsString()
    numpol: string;

    @IsString()
    iniciales: string;

    @IsString()
    padre: string;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}