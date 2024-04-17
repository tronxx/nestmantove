import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateKardexDto } from "./create-kardex.dto";

export class EditKardexDto extends PartialType(
    OmitType( CreateKardexDto, [] as const)
) 
{}
