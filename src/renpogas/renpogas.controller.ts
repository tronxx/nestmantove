import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Renpogas } from './entities';
import { CreateRenpogasDto, EditRenpogasDto } from './dtos'
import { RenpogasService } from './renpogas.service';

@ApiTags('renpogas')
@Controller('renpogas')
export class RenpogasController {
    constructor (private readonly renpogasService: RenpogasService) {}
    @Get(':cia/:idpoligas')
    async getMany(
        @Param('cia') cia: number,
        @Param('idpoligas') idpoligas: number
    ) {
        return await this.renpogasService.getManyxRenpogas(cia, idpoligas);
    }

    @Get(':cia/:idpoligas/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('idpoligas') idpoligas: number,
        @Param('id') id: number
    ) {
        return this.renpogasService.getOne(cia, id);
    }


    @Post()
    async createOne(
        @Body() dto: CreateRenpogasDto
    ) {
        return this.renpogasService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditRenpogasDto
    ) {
        return this.renpogasService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.renpogasService.deleteOne(id);
    }

}
