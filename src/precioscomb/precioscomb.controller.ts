import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrecioscombService } from './precioscomb.service'
import { CreatePreciosCombDto, EditPreciosCombDto } from './dtos'

@ApiTags('precioscomb')
@Controller('precioscomb')
export class PreciosCombController {

    constructor (private readonly precioscombService: PrecioscombService) {}

    @Get(':idcombust')
    async getMany(
        @Param('idcombust') idcombust: number
    ) {
        return await this.precioscombService.getMany(idcombust);
    }

    @Get(':idcombust/:id')
    getOne(
        @Param('idcombust') idcombust: number,
        @Param('id') id: number
    ) {
        return this.precioscombService.getOne(idcombust, id);
    }

    @Post()
    async createOne(
        @Body() dto: CreatePreciosCombDto
    ) {
        return this.precioscombService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditPreciosCombDto
    ) {
        return this.precioscombService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.precioscombService.deleteOne(id);
    }

}
