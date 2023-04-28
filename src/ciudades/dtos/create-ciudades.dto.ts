import { IsNumber, IsInt, IsString } from "class-validator";

export class CreateCiudadesDto {

    @IsString()
    ciudad: string;

    @IsInt()
    idestado: number;

    @IsString()
    status: string;

    @IsInt()
    cia: number;

}