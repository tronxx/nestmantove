import { IsNumber, IsInt, IsString, IsEmail, IsDate, IsDateString } from "class-validator";

export class CreatePoligasDto {

    @IsInt()
    idalmacen: number;

    @IsDateString()
    fecha: string;

    @IsInt()
    idusuario: number;

    @IsNumber()
    importe: number;

    @IsNumber()
    iva: number;

    @IsNumber()
    total: number;

    @IsNumber()
    promkml: number;

    @IsNumber()
    litros: number;

    @IsNumber()
    kmts: number;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}