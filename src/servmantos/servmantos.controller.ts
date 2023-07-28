import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServmantosService } from './servmantos.service';
import { CreateServMantoDto, EditServMantosDto } from './dtos'

@ApiTags('servmantos')
@Controller('servmantos')
export class ServmantosController {
    constructor (private readonly servmantosService: ServmantosService) {}
    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.servmantosService.getManyCia(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.servmantosService.getOne(cia, id);
    }

    @Get(':cia/:id/:idservmanto')
    getServmantoxvehi(
        @Param('cia') cia: number,
        @Param('id') id: number,
        @Param('idservmanto') idservmanto: number

    ) {
        return this.servmantosService.getManyMantosxVehi(idservmanto);
    }


    @Post()
    async createOne(
        @Body() dto: CreateServMantoDto
    ) {
        return this.servmantosService.createOne(dto);
    }

    @Post(':idservmanto')
    async create_particularidades (
        @Param('idservmanto') idservmanto:number,
        @Body() dto: any
    )
    {
        return this.servmantosService.createServMantosxVehi(idservmanto, dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditServMantosDto
    ) {
        return this.servmantosService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.servmantosService.deleteOne(id);
    }

}
