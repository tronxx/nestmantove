import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateVendedorDto } from "./create-vendedores.dto";

export class EditVendedorDto extends PartialType(
    OmitType( CreateVendedorDto, ['codigo'] as const)
) 
{}
