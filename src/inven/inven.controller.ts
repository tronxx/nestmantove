import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvenService } from './inven.service';
import { CreateInvenDto, EditInvenDto } from './dtos'
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('inven')
@Controller('inven')
export class InvenController {

    constructor (private readonly invenService: InvenService) {}

    @ApiBearerAuth()
    @Get(':cia')
    getMany(
        @Param('cia') cia: number
    ) {
        //return await this.invenService.getMany();
        return this.invenService.getManyCia(cia)
    }

    @ApiBearerAuth()
    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.invenService.getOne(cia, id);
    }

    @ApiBearerAuth()
    @Get(':cia/:id/:codigo')
    getManyLike(
        @Param('cia') cia: number,
        @Param('id') id: number,
        @Param('codigo') codigo: string,
    ) {
        return this.invenService.getManyCiaLike(cia, codigo);
    }

    @Get(':cia/:id/:codigo/:hacia')
    getSigteAnter(
        @Param('cia') cia: number,
        @Param('id') id: number,
        @Param('codigo') codigo: string,
        @Param('hacia') hacia: string,
    ) {
        return this.invenService.getSigteAnter(cia, codigo, hacia);
    }

    @ApiBearerAuth()
    @Post()
    async createOne(
        @Body() dto: CreateInvenDto
    ) {
        return this.invenService.createOne(dto);
    }

    @ApiBearerAuth()
    @Post('/actualiza')
    async actualizaCatalogo(
        @Body() dto: CreateInvenDto[]
    ) {
        return this.invenService.actualizaCatalogo(dto);
    }

    @ApiBearerAuth()
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditInvenDto
    ) {
        return this.invenService.editOne(id, dto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.invenService.deleteOne(id);
    }

}
