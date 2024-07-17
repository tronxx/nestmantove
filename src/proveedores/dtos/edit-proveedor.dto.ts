import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateProveedoresDto  } from "./create-proveedores.dto";

export class EditProveedorDto extends PartialType(
    OmitType( CreateProveedoresDto, ['codigo'] as const)
) 
{}
