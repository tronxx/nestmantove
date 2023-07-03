import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateCiudadesDto } from './create-ciudades.dto';

export class EditCiudadesDto extends PartialType(
    OmitType( CreateCiudadesDto, ['cia'] as const)
) 
{}
