import { IsNumber, IsInt, IsString } from "class-validator";

export class CreateTalleresDto {

    @IsString()
    clave: string;

    @IsString()
    nombre: string;

    @IsString()
    representante: string;

    @IsString()
    direc: string;

    @IsString()
    telefono: string;

    @IsInt()
    cia: number;

    @IsString()
    giro: string;

    @IsString()
    fecbaj: Date;

    @IsString()
    status: string;

}