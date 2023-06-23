import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateChoferDto {

    @IsString()
    codigo: string;

    @IsString()
    nombre: string;

    @IsString()
    direc: string;

    @IsString()
    telefono: string;

    @IsString()
    ciudad: string;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}