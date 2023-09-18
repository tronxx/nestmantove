import { IsNumber, IsInt, IsString, IsEmail, IsDate, IsDateString } from "class-validator";

export class CreateCiasedoctaDto {

    @IsDateString()
    fecha: string;

    @IsDateString()
    vence: string;

    @IsString()
    concepto: string;

    @IsString()
    coa: string;

    @IsString()
    tipo: string;

    @IsInt()
    docto: number;

    @IsNumber()
    importe: number;

    @IsNumber()
    saldo: number;

    @IsInt()
    facafec: number;

    @IsInt()
    cia: number;

}