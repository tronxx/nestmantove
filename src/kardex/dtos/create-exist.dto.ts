import { IsNumber, IsInt, IsString, IsIn } from "class-validator";

export class CreateExistDto  {
    @IsInt()
    id: number;

    @IsInt()
    idalm: number;

    @IsInt()
    idart: number;

    @IsInt()
    inicial: number;

    @IsInt()
    entran: number;

    @IsInt()
    salen: number;

    @IsInt()
    exist: number;

    @IsString()
    status: string;

    @IsInt()
    cia: number;
}
