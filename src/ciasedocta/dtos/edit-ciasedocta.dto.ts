import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateCiasedoctaDto } from './create-ciasedocta.dto'

export class EditCiasedooctaDto extends PartialType(
    OmitType( CreateCiasedoctaDto, [])
) 
{}
