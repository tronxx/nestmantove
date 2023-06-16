import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CiaService } from './cias.service';
import { CreateCiaDto, EditCiaDto } from './dtos'

@ApiTags('cias')
@Controller('cias')
export class CiasController {

    constructor (private readonly ciaService: CiaService) {}

    @Get()
    async getMany() {
        return await this.ciaService.getMany();
    }

    @Get(':cia')
    getOne(
        @Param('cia') cia: number
    ) {
        return this.ciaService.getOne(cia);
    }

    @Get(':cia/:rfc')
    findbyrfc(
        @Param('rfc') rfc: string
    ) {
        return this.ciaService.busca_rfc_cia(rfc);
    }

    @Post()
    async createOne(
        @Body() dto: CreateCiaDto
    ) {
        return this.ciaService.createOne(dto);
    }

    @Put(':cia')
    editOne(
        @Param('cia') cia: number,
        @Body() dto: EditCiaDto
    ) {
        return this.ciaService.editOne(cia, dto);
    }

    @Delete(':cia')
    deletOne(@Param('cia') cia: number) {
        return this.ciaService.deleteOne(cia);
    }

}
