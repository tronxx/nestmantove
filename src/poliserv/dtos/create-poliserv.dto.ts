import { IsNumber, IsInt, IsString, IsEmail, IsDate, IsDateString } from "class-validator";

export class CreatePoliservDto {

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

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}