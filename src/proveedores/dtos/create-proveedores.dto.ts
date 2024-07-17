import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateProveedoresDto {

    @IsString()
    codigo: string;

    @IsString()
    appat: string;

    @IsString()
    apmat: string;

    @IsString()
    nombre1: string;

    @IsString()
    nombre2: string;

    @IsString()
    direc: string;

    @IsString()
    telefono: string;

    @IsString()
    ciudad: string;

    @IsInt()
    idregimen: number;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}