import { IsNumber, IsInt, IsString } from "class-validator";

export class CreateMarcasvehDto {

    @IsString()
    marca: string;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}