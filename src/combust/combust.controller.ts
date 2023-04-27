import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CombustService } from './combust.service'
import { CreateCombustDto, EditCombustDto } from './dtos'

@ApiTags('combust')
@Controller('combust')
export class CombustController {

    constructor (private readonly CombustService: CombustService) {}

    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.CombustService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.CombustService.getOne(cia, id);
    }

    @Post()
    async createOne(
        @Body() dto: CreateCombustDto
    ) {
        return this.CombustService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditCombustDto
    ) {
        return this.CombustService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.CombustService.deleteOne(id);
    }

}
