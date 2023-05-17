import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { CreateUsuariosDto, EditUsuariosDto } from './dtos'

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
    constructor (private readonly usuariosService: UsuariosService) {}
    @Get(':cia')
    async getMany(
        @Param('cia') cia: number
    ) {
        return await this.usuariosService.getMany(cia);
    }

    @Get(':cia/:id')
    getOne(
        @Param('cia') cia: number,
        @Param('id') id: number
    ) {
        return this.usuariosService.getOne(cia, id);
    }

    @Get(':cia/:login/:password')
    getbylogin(
        @Param('login') login: string,
        @Param('password') pwd: string
    ) {
        return this.usuariosService.getbylogin(login, pwd);
    }

    @Post()
    async createOne(
        @Body() dto: CreateUsuariosDto
    ) {
        return this.usuariosService.createOne(dto);
    }

    @Put(':id')
    editOne(
        @Param('id') id: number,
        @Body() dto: EditUsuariosDto
    ) {
        return this.usuariosService.editOne(id, dto);
    }

    @Delete(':id')
    deletOne(@Param('id') id: number) {
        return this.usuariosService.deleteOne(id);
    }

}
