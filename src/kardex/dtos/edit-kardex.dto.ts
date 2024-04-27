import { PartialType, OmitType } from "@nestjs/mapped-types";
import { KardexDto } from "./kardex.dto";

export class EditKardexDto extends PartialType(
    OmitType( KardexDto, ['serie'] as const)
) 
{}
