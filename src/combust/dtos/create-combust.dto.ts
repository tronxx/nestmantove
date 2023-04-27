import { IsNumber, IsDate, IsInt, IsString } from "class-validator";

export class CreateCombustDto {

    @IsString()
    clave: string;

    @IsString()
    descri: string;

    @IsNumber()
    prelit: number;

    @IsNumber()
    piva: number;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}