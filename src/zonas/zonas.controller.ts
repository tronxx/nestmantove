
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {  ZonasService } from './zonas.service';
import { CreateZonasDto, EditZonasDto } from './dtos'

@ApiTags('zonas')
@Controller('zonas')
export class ZonasController {

    constructor (private readonly zonasService: ZonasService) {}

    @Get(':cia')
    getMany(
        @Param('cia') cia: number
    ) {
        //return await this.almacenesService.getMany();
        return this.zonasService.getManyCia(cia)
    }

    @Get(':cia/:id')
    getOne(
        @Param('id') id: number,
        @Param('cia') cia: number
    ) {
        return this.zonasService.getOne(cia, id);
    }

    @Post()
    async createOne(
        @Body() dto: CreateZonasDto
    ) {
        return this.zonasService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditZonasDto
    ) {
        return this.zonasService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.zonasService.deleteOne(id);
    }

}
