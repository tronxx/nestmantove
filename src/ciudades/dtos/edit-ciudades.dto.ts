import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateCiudadesDto } from './create-ciudades.dto';

export class EditCiudadesDto extends PartialType(
    OmitType( CreateCiudadesDto, ['ciudad'] as const)
) 
{}
