import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateZonasDto } from './create-zonas.dto';

export class EditZonasDto extends PartialType(
    OmitType( CreateZonasDto, ['zona'] as const)
) 
{}
