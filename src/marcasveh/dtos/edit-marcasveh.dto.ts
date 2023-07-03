import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateMarcasvehDto } from './create-marcasveh.dto';

export class EditMarcasvehDto extends PartialType(
    OmitType( CreateMarcasvehDto, ['cia'] as const)
) 
{}
