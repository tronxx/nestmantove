import { IsNumber, IsInt, IsString } from "class-validator";

export class CreateMantoxVehiculoDto {

    @IsNumber()
	idservmanto: number;

    @IsNumber()
	idvehiculo : number; 

    @IsNumber()
    xcada		:number;

    @IsNumber()
    cia			:number;
}

