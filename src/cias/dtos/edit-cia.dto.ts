import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateCiaDto } from './create-cia.dto';

export class EditCiaDto extends PartialType(
    OmitType( CreateCiaDto, ['cia'] as const)
) 
{}
