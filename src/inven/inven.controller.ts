import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InvenService } from './inven.service';
import { CreateInvenDto, EditInvenDto } from './dtos'

@ApiTags('inven')
@Controller('inven')
export class InvenController {

    constructor (private readonly invenService: InvenService) {}

    @Get(':cia')
    getMany(
        @Param('cia') cia: number
    ) {
        //return await this.invenService.getMany();
        return this.invenService.getManyCia(cia)
    }

    @Get(':cia/:id')
    getOne(
        @Param('id') id: number,
        @Param('cia') cia: number
    ) {
        return this.invenService.getOne(cia, id);
    }

    @Get(':cia/:id/:codigo')
    getManyLike(
        @Param('cia') cia: number,
        @Param('id') id: number,
        @Param('codigo') codigo: string,
    ) {
        return this.invenService.getManyCiaLike(cia, codigo);
    }

    @Post()
    async createOne(
        @Body() dto: CreateInvenDto
    ) {
        return this.invenService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditInvenDto
    ) {
        return this.invenService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.invenService.deleteOne(id);
    }

}
