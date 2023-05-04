import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateUsuariosDto } from './create-usuarios.dto';

export class EditUsuariosDto extends PartialType(
    OmitType( CreateUsuariosDto, ['login'] as const)
) 
{}
