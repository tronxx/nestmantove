import { IsNumber, IsInt, IsString } from "class-validator";

export class CreateCiaDto {

    @IsInt()
    cia: number;

    @IsString()
    razon: string;

    @IsString()
    direc: string;

    @IsString()
    direc2: string;

    @IsString()
    nomfis: string;

    @IsString()
    telefono: string;

    @IsString()
    fax: string;

    @IsString()
    rfc: string;

    @IsString()
    status: string;

}