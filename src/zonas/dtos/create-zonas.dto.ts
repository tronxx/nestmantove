import { IsNumber, IsInt, IsString } from "class-validator";

export class CreateZonasDto {

    @IsString()
    zona: number;

    @IsString()
    nombre: string;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}