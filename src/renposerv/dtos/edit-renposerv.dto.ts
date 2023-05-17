import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateRenposervDto } from './create-renposerv.dto';

export class EditRenposervDto extends PartialType(
    OmitType( CreateRenposervDto, ['idpoliserv'] as const)
) 
{}
