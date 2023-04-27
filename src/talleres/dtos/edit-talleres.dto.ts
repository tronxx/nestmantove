import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateTalleresDto } from './create-talleres.dto';

export class EditTalleresDto extends PartialType(
    OmitType( CreateTalleresDto, ['clave'] as const)
) 
{}
