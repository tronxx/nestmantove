import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateChoferDto } from "./create-choferes.dto";

export class EditChoferDto extends PartialType(
    OmitType( CreateChoferDto, ['codigo'] as const)
) 
{}
