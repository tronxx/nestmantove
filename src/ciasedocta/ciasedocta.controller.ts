import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CiasedoctaService } from './ciasedocta.service'
import {  CreateCiasedoctaDto, EditCiasedooctaDto} from './dtos'

@Controller('ciasedocta')
export class CiasedoctaController {
    constructor (private readonly ciasedoctaService: CiasedoctaService) {}
    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.ciasedoctaService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.ciasedoctaService.getOne(cia, id);
    }

    @Get(':cia/:fechaini/:fechafin')
    getRangoFechas(
        @Param('cia') cia: number,
        @Param('fechaini') fechaini: string,
        @Param('fechafin') fechafin: string
    ) {
        return this.ciasedoctaService.getManyxFecha(cia, fechaini, fechafin);
    }

    @Post()
    async createOne(
        @Body() dto: CreateCiasedoctaDto
    ) {
        return this.ciasedoctaService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditCiasedooctaDto
    ) {
        return this.ciasedoctaService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.ciasedoctaService.deleteOne(id);
    }

}
