import { IsNumber, IsInt, IsString } from "class-validator";

export class CreateEstadosDto {

    @IsString()
    estado: string;

    @IsString()
    status: string;

    @IsInt()
    cia: number;

}