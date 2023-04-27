import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChoferesService } from './choferes.service'
import { CreateChoferDto, EditChoferDto } from './dtos'

@ApiTags('choferes')
@Controller('choferes')
export class ChoferesController {

    constructor (private readonly choferesService: ChoferesService) {}

    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.choferesService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.choferesService.getOne(cia, id);
    }

    @Post()
    async createOne(
        @Body() dto: CreateChoferDto
    ) {
        return this.choferesService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditChoferDto
    ) {
        return this.choferesService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.choferesService.deleteOne(id);
    }

}
