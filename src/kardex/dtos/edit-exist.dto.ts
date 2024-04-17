import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateExistDto } from "./create-exist.dto";

export class EditExistDto extends PartialType(
    OmitType( CreateExistDto, [] as const)
) 
{}
