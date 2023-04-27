import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {  MarcasvehService } from './marcasveh.service';
import { CreateMarcasvehDto, EditMarcasvehDto } from './dtos'

@ApiTags('marcasveh')
@Controller('marcasveh')
export class MarcasvehController {

    constructor (private readonly marcasService: MarcasvehService) {}

    @Get(':cia')
    getMany(
        @Param('cia') cia: number
    ) {
        //return await this.almacenesService.getMany();
        return this.marcasService.getManyCia(cia)
    }

    @Get(':cia/:id')
    getOne(
        @Param('id') id: number,
        @Param('cia') cia: number
    ) {
        return this.marcasService.getOne(cia, id);
    }

    @Post()
    async createOne(
        @Body() dto: CreateMarcasvehDto
    ) {
        return this.marcasService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditMarcasvehDto
    ) {
        return this.marcasService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.marcasService.deleteOne(id);
    }

}
