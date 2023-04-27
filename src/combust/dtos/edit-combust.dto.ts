import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateCombustDto } from './create-combust.dto';

export class EditCombustDto extends PartialType(
    OmitType( CreateCombustDto, ['clave'] as const)
) 
{}
