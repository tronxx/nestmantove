import { IsNumber, IsDate, IsInt, IsString, IsDateString } from "class-validator";

export class CreatePreciosCombDto {

    @IsInt()
    idcombust: number;

    @IsDateString()
    fecha: string;

    @IsNumber()
    prelit: number;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}