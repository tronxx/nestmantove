
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Poliserv } from './entities';
import { CreatePoliservDto, EditPoliservDto } from './dtos'
import { PoliservService } from './poliserv.service';

@ApiTags('poliserv')
@Controller('poliserv')
export class PoliservController {
    constructor (private readonly poliservService: PoliservService) {}
    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.poliservService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.poliservService.getOne(cia, id);
    }

    @Get(':cia/:fechaini/:fechafin')
    getRangoFechas(
        @Param('cia') cia: number,
        @Param('fechaini') fechaini: string,
        @Param('fechafin') fechafin: string
    ) {
        return this.poliservService.getManyxFecha(cia, fechaini, fechafin);
    }

    @Post()
    async createOne(
        @Body() dto: CreatePoliservDto
    ) {
        return this.poliservService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditPoliservDto
    ) {
        return this.poliservService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.poliservService.deleteOne(id);
    }

}
