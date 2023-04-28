import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateEstadosDto } from './create-estados.dto';

export class EditEstadosDto extends PartialType(
    OmitType( CreateEstadosDto, ['estado'] as const)
) 
{}
