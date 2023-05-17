import { IsNumber, IsInt, IsString, IsEmail, IsDate, IsDateString, isDateString } from "class-validator";

export class CreateRenposervDto {

    @IsInt()
    idpoliserv: number;

    @IsInt()
    idvehiculo: number;

    @IsDateString()
    fecha: string;

    @IsInt()
    conse: number;

    @IsInt()
    idservmanto: number;

    @IsInt()
    kilom: number;

    @IsString()
    edotoggle: string;

    @IsInt()
    idtalleraut: number;

    @IsString()
    observ: string;

    @IsNumber()
    costo: number;

    @IsInt()
    idchofer: number;

    @IsInt()
    idusuario: number;

    @IsInt()
    cia: number;

}