import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { CreateUsuariosDto, EditUsuariosDto } from './dtos'
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
    constructor (private readonly usuariosService: UsuariosService) {}


    @UseGuards(JwtAuthGuard)
    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.usuariosService.getMany(cia);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.usuariosService.getOne(cia, id);
    }

    @Get(':cia/:login/:password')
    getbylogin(
        @Param('cia') cia: number,
        @Param('login') login: string,
        @Param('password') pwd: string
    ) {
        return this.usuariosService.getbylogin(login, pwd);
    }

    @Get(':cia/:login/:password/:existe')
    existelogin(
        @Param('login') login: string
    ) {
        return this.usuariosService.existelogin(login);
    }



    @Post()
    async createOne(
        @Body() dto: CreateUsuariosDto
    ) {
        return this.usuariosService.createOne(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditUsuariosDto
    ) {
        return this.usuariosService.editOne(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.usuariosService.deleteOne(id);
    }

}
