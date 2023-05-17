import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuariosDto, EditUsuariosDto } from './dtos';
import { Usuarios } from './entities';

@Injectable()
export class UsuariosService {

    constructor (
        @InjectRepository(Usuarios)
        private readonly usuariosRepository: Repository<Usuarios>
    )
    {}

    async getMany(cia: number) :Promise < Usuarios []>  {
        return await this.usuariosRepository.findBy({cia});
    }

    async getOne(cia: number, id: number) : Promise<Usuarios> {
        const miusuario = await this.usuariosRepository.findOneBy({cia, id});
        if(!miusuario) throw new NotFoundException ('Usuario Inexistente');
       return miusuario;
    }

    async getbylogin(login: string, pwd: string) : Promise<Usuarios> {
        const miusuario =  await this.usuariosRepository.findOne({
            where: {
                email: login,
                clave: pwd
            }
            });
        if(!miusuario) throw new NotFoundException ('Usuario Inexistente');
        miusuario.clave = "xx"
       return miusuario;
    }

    async editOne(id: number, dto: EditUsuariosDto) {
        const miusuario = await this.usuariosRepository.findOneBy({id});
        if(!miusuario) throw new NotFoundException ('Usuario Inexistente');
        const editedUsuario = Object.assign(miusuario, dto);
        return await this.usuariosRepository.update(id, editedUsuario);

    }

    async deleteOne(id: number) {
        const miusuario = await this.usuariosRepository.findOneBy({id});
        if(!miusuario) throw new NotFoundException ('Usuario Inexistente');
        return await this.usuariosRepository.delete(id);

    }

    async createOne(dto: CreateUsuariosDto) {
        const miusuario = this.usuariosRepository.create(dto);
        return await this.usuariosRepository.save(miusuario);

    }

}
