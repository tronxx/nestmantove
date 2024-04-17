import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { KardexService } from './kardex.service';
import { CreateKardexDto, EditKardexDto } from './dtos';

@ApiTags('kardex')
@Controller('kardex')
export class KardexController {

    constructor (private readonly kardexService: KardexService) {}

    @Get(':cia/:idart/:idalm')
    getMany(
        @Param('cia') cia: number,
        @Param('idart') idart: number,
        @Param('idalm') idalm: number
    ) {
        //return await this.kardexService.getMany();
        return this.kardexService.getManyCia(cia, idalm, idart)
    }

    @Get(':cia/:id')
    getOne(
        @Param('id') id: number,
        @Param('cia') cia: number
    ) {
        return this.kardexService.getOne(cia, id);
    }

    @Get(':cia/:id/:codigo')
    getManyLike(
        @Param('cia') cia: number,
        @Param('id') id: number,
        @Param('codigo') codigo: string,
    ) {
        return this.kardexService.getManyCiaLike(cia, codigo);
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
