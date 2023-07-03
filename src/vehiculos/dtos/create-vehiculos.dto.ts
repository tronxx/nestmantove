import { IsNumber, IsInt, IsString } from "class-validator";

export class CreateVehiculosDto {

    @IsInt()
    codigo: number;

    @IsString()
    descri: string;

    @IsInt()
    idmarcaveh: number;

    @IsInt()
    modelo: number;

    @IsString()
    fecing: Date;

    @IsString()
    placas: string;

    @IsString()
    chasis: string;

    @IsString()
    sermot: string;

    @IsInt()
    maxtac: number;

    @IsInt()
    kilom: number;

    @IsInt()
    tacacu: number;

    @IsInt()
    nvohasta: number;

    @IsString()
    nvousa: string;

    @IsInt()
    idtipogas: number;

    @IsString()
    caractm: string;

    @IsString()
    tipollanta: string;

    @IsString()
    bateria: string;

    @IsString()
    polseg: string;

    @IsString()
    venpol: Date;

    @IsInt()
    idchofer: number;

    @IsString()
    camtac: string;

    @IsInt()
    kmtcamtac: number;

    @IsInt()
    idzona: number;

    @IsString()
    moto: string;

    @IsString()
    fecamtac: Date;

    @IsString()
    fecbaj: Date;

    @IsInt()
    cia: number;

    @IsString()
    status: string;

}