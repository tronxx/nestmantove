import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateInvenDto } from "./create-inven.dto";

export class EditInvenDto extends PartialType(
    OmitType( CreateInvenDto, ['codigo'] as const)
) 
{}
