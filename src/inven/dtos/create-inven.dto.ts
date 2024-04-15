import { IsNumber, IsInt, IsString } from "class-validator";

export class CreateInvenDto {

    @IsString()
    codigo: string;

    @IsString()
    cod2: string;

    @IsString()
    descri: string;

    @IsString()
    tipo: string;

    @IsString()
    linea: string;

    @IsString()
    grupo: string;

    @IsNumber ()
    preciou: number;

    @IsNumber ()
    piva: number;

    @IsNumber ()
    costos: number;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

    @IsInt()
    inicial: number;

    @IsInt()
    entran: number;

    @IsInt()
    salen: number;

    @IsInt()
    exist: number;


}