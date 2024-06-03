import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSeriesDto } from '../kardex/dtos'
import { SeriesinvenService } from './seriesinven.service'
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';

@ApiTags('seriesinven')
@Controller('seriesinven')
export class SeriesinvenController {
    constructor (private readonly seriesinvenService: SeriesinvenService) {}

    @Get(':serie')
    async getMany(
        @Param('serie') serie: string
    ) {
        return await this.seriesinvenService.getMany(serie);
    }

    @Post()
    async createOne(
        @Body() dto: CreateSeriesDto
    ) {
        return this.seriesinvenService.createOne(dto);
    }

    @Post('/actualiza')
    async actualizaSeries(
        @Body() dto: [CreateSeriesDto]
    ) {
        return this.seriesinvenService.actualizaSeries(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: CreateSeriesDto
    ) {
        return this.seriesinvenService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.seriesinvenService.deleteOne(id);
    }

}
