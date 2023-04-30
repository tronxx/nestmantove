import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TalleresService } from './talleres.service';
import { CreateTalleresDto, EditTalleresDto } from './dtos'

@ApiTags('talleres')
@Controller('talleres')
export class TalleresController {
    constructor (private readonly talleresService: TalleresService) {}
    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.talleresService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.talleresService.getOne(cia, id);
    }

    @Post()
    async createOne(
        @Body() dto: CreateTalleresDto
    ) {
        return this.talleresService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditTalleresDto
    ) {
        return this.talleresService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.talleresService.deleteOne(id);
    }

}
