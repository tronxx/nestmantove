import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateClientesDto } from "./create-clientes.dto";

export class EditClienteDto extends PartialType(
    OmitType( CreateClientesDto, ['codigo'] as const)
) 
{}
