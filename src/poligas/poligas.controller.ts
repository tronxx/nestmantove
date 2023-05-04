import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Poligas } from './entities';
import { CreatePoligasDto, EditPolizasDto } from './dtos'
import { PoligasService } from './poligas.service';

@ApiTags('poligas')
@Controller('poligas')
export class PoligasController {
    constructor (private readonly poligasService: PoligasService) {}
    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.poligasService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.poligasService.getOne(cia, id);
    }

    @Get(':cia/:fechaini/:fechafin')
    getRangoFechas(
        @Param('cia') cia: number,
        @Param('fechaini') fechaini: string,
        @Param('fechafin') fechafin: string
    ) {
        return this.poligasService.getManyxFecha(cia, fechaini, fechafin);
    }

    @Post()
    async createOne(
        @Body() dto: CreatePoligasDto
    ) {
        return this.poligasService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditPolizasDto
    ) {
        return this.poligasService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.poligasService.deleteOne(id);
    }

}
