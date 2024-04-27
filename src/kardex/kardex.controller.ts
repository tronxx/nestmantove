import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { KardexService } from './kardex.service';
import { CreateKardexDto, EditKardexDto } from './dtos';

@ApiTags('kardex')
@Controller('kardex')
export class KardexController {

    constructor (private readonly kardexService: KardexService) {}

    @Get(':cia/:idalm/:idart')
    getMany(
        @Param('cia') cia: number,
        @Param('idalm') idalm: number,
        @Param('idart') idart: number,
    ) {
        //return await this.kardexService.getMany();
        return this.kardexService.getManyCia(cia, idalm, idart)
    }

    @Get(':id')
    getOne(
        @Param('id') id: number,
    ) {
        return this.kardexService.getOne(id);
    }


    @Get(':cia/:idart/:idalm/:lastfolio')
    getLastFolio(
        @Param('cia') cia: number,
        @Param('idart') idart: number,
        @Param('idalm') idalm: number,
        @Param('lastfolio') lastfolio: number,
    ) {
        return this.kardexService.getLastFolio(idart, idalm);
    }

    @Post()
    async createOne(
        @Body() dto: CreateKardexDto
    ) {
        return this.kardexService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditKardexDto
    ) {
        return this.kardexService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.kardexService.deleteOne(id);
    }

}
