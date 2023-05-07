import { IsNumber, IsInt, IsString, IsEmail, IsDate, IsDateString } from "class-validator";

export class CreateRenpogasDto {

    @IsInt()
    idpoligas: number;

    @IsInt()
    idvehiculo: number;

    @IsInt()
    kmtant: number;

    @IsInt()
    kmtact: number;

    @IsInt()
    recorr: number;

    @IsNumber()
    litros: number;

    @IsNumber()
    preciou: number;

    @IsInt()
    idcombust: number;

    @IsInt()
    idchofer: number;

    @IsInt()
    idzona: number;

    @IsNumber()
    importe: number;

    @IsNumber()
    iva: number;

    @IsNumber()
    total: number;

    @IsNumber()
    piva: number;

    @IsInt()
    idusuario: number;

    @IsDateString()
    fecnot: string;

    @IsInt()
    conse: number;

    @IsInt()
    kmtacu: number;

    @IsInt()
    idtipago: number;

    @IsInt()
    cia: number;

}