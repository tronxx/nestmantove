import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EstadosService } from './estados.service';
import { CreateEstadosDto, EditEstadosDto } from './dtos'

@ApiTags('estados')
@Controller('estados')
export class EstadosController {

    constructor (private readonly estadosService: EstadosService) {}

    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.estadosService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.estadosService.getOne(cia, id);
    }

    @Post()
    async createOne(
        @Body() dto: CreateEstadosDto
    ) {
        return this.estadosService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditEstadosDto
    ) {
        return this.estadosService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.estadosService.deleteOne(id);
    }

}
