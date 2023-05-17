import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreatePoliservDto } from './create-poliserv.dto';

export class EditPoliservDto extends PartialType(
    OmitType( CreatePoliservDto, ['idalmacen', 'fecha'] as const)
) 
{}
