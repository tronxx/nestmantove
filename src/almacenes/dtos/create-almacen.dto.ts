import { IsNumber, IsInt, IsString } from "class-validator";

export class CreateAlmacenDto {

    @IsString()
    clave: string;

    @IsString()
    nombre: string;

    @IsString()
    direc: string;

    @IsString()
    ciudad: string;

    @IsString()
    estado: string;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}