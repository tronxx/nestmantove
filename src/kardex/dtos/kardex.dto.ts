import { IsNumber, IsInt, IsString } from "class-validator";

export class KardexDto {
    @IsInt()
    idalm: number;

    @IsInt()
    idart: number;

    @IsInt()
    docto: number;

    @IsString()
    fecha: string;

    @IsInt()
    folio: number;

    @IsInt()
    idserie: number;

    @IsString()
    serie: string;

    @IsString()
    descri: string;

    @IsInt()
    canti: number;

    @IsNumber()
    costou: number;

    @IsString()
    status: string;

    @IsString()
    salio: string;

    @IsString()
    descrisale: string;

    @IsString()
    fechasale: string;

    @IsInt()
    cia: number;

}
