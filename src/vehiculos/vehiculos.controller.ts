import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculosDto, EditVehiculosDto } from './dtos'

@ApiTags('vehiculos')
@Controller('vehiculos')
export class VehiculosController {
    constructor (private readonly vehiculosService: VehiculosService) {}
    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.vehiculosService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.vehiculosService.getOne(cia, id);
    }

    @Post()
    async createOne(
        @Body() dto: CreateVehiculosDto
    ) {
        return this.vehiculosService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditVehiculosDto
    ) {
        return this.vehiculosService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.vehiculosService.deleteOne(id);
    }

}
