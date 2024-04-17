import { IsNumber, IsInt, IsString } from "class-validator";

export class CreateSeriesDto {
    @IsString()
    serie: string;
}
