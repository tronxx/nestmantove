import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateVehiculosDto } from './create-vehiculos.dto';

export class EditVehiculosDto extends PartialType(
    OmitType( CreateVehiculosDto, ['codigo'] as const)
) 
{}
