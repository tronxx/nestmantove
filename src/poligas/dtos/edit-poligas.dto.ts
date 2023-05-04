import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreatePoligasDto } from './create-poligas.dto';

export class EditPolizasDto extends PartialType(
    OmitType( CreatePoligasDto, ['idalmacen', 'fecha'] as const)
) 
{}
