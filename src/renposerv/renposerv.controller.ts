import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Renposerv } from './entities';
import { CreateRenposervDto, EditRenposervDto } from './dtos'
import { RenposervService } from './renposerv.service';

@ApiTags('renposerv')
@Controller('renposerv')
export class RenposervController {
    constructor (private readonly renposervService: RenposervService) {}
    @Get(':cia/:idpoliserv')
    async getMany(
        @Param('cia') cia: number,
        @Param('idpoliserv') idpoliserv: number
    ) {
        return await this.renposervService.getManyxRenpogas(cia, idpoliserv);
    }

    @Get(':cia/:idpoliserv/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('idpoliserv') idpoliserv: number,
        @Param('id') id: number
    ) {
        return this.renposervService.getOne(cia, id);
    }


    @Post()
    async createOne(
        @Body() dto: CreateRenposervDto
    ) {
        return this.renposervService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditRenposervDto
    ) {
        return this.renposervService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.renposervService.deleteOne(id);
    }

}
