import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateServMantoDto } from './create-servmantos.dto';

export class EditServMantosDto extends PartialType(
    OmitType( CreateServMantoDto, ['clave'] as const)
) 
{}
