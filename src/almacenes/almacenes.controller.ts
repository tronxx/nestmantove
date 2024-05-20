import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards  } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AlmacenesService } from './almacenes.service';
import { CreateAlmacenDto, EditAlmacenDto } from './dtos'
import { JwtAuthGuard } from  '../usuarios/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('almacenes')
@Controller('almacenes')
export class AlmacenesController {

    constructor (private readonly almacenesService: AlmacenesService) {}

    @Get(':cia')
    getMany(
        @Param('cia') cia: number
    ) {
        //return await this.almacenesService.getMany();
        return this.almacenesService.getManyCia(cia)
    }

    @Get(':cia/:id')
    getOne(
        @Param('id') id: number,
        @Param('cia') cia: number
    ) {
        return this.almacenesService.getOne(cia, id);
    }

    @Post()
    async createOne(
        @Body() dto: CreateAlmacenDto
    ) {
        return this.almacenesService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditAlmacenDto
    ) {
        return this.almacenesService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.almacenesService.deleteOne(id);
    }

}
