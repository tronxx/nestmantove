import { IsNumber, IsInt, IsString } from "class-validator";

export class CreateServMantoDto {

    @IsString()
    clave: string;

    @IsString()
    descri: string;

    @IsString()
    mantoorepar: string;

    @IsString()
    perio: string;

    @IsString()
    kmofe: string;

    @IsInt()
    xcada: number;

    @IsInt()
    toler: number;

    @IsString()
    toggle: string;

    @IsString()
    servop: string;

    @IsString()
    motoocam: string;

    @IsInt()
    cia: number;

    @IsInt()
    idvehiculo: number;

    @IsString()
    status: string;
}