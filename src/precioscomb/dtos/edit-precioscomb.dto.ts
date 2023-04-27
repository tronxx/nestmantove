import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreatePreciosCombDto } from './create-precioscomb.dto';

export class EditPreciosCombDto extends PartialType(
    OmitType( CreatePreciosCombDto, ['idcombust'] as const)
) 
{}
