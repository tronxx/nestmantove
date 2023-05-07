import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateRenpogasDto } from './create-renpogas.dto';

export class EditRenpogasDto extends PartialType(
    OmitType( CreateRenpogasDto, ['idpoligas'] as const)
) 
{}
