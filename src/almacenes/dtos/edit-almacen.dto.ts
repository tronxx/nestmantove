import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateAlmacenDto } from "./create-almacen.dto";

export class EditAlmacenDto extends PartialType(
    OmitType( CreateAlmacenDto, ['clave'] as const)
) 
{}
