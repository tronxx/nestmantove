import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CiudadesService } from './ciudades.service';
import { CreateCiudadesDto, EditCiudadesDto } from './dtos'

@ApiTags('ciudades')
@Controller('ciudades')
export class CiudadesController {

    constructor (private readonly ciudadesService: CiudadesService) {}

    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.ciudadesService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.ciudadesService.getOne(cia, id);
    }

    @Post()
    async createOne(
        @Body() dto: CreateCiudadesDto
    ) {
        return this.ciudadesService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditCiudadesDto
    ) {
        return this.ciudadesService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.ciudadesService.deleteOne(id);
    }

}
