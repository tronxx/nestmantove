import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
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
        const login = dto.login;
        const email = dto.email;
        const iniciales = dto.iniciales;
        const miusuario1 = await this.usuariosRepository.findOneBy({login});
        if(miusuario1) throw new NotAcceptableException ('Ya Existe el Login');
        const miusuario2 = await this.usuariosRepository.findOneBy({email});
        if(miusuario2) throw new NotAcceptableException ('Ya Existe el email');
        const miusuario3 = await this.usuariosRepository.findOneBy({iniciales});
        if(miusuario3) throw new NotAcceptableException ('Ya Existen las Iniciales');

        const miusuario = this.usuariosRepository.create(dto);
        return await this.usuariosRepository.save(miusuario);

    }

    async existelogin(email: string) : Promise<any> {
        const miusuario = await this.usuariosRepository.findOneBy({email});
        if(!miusuario) {
            const respu = {
                id: -1,
                nombre: "-1",
                found: false,
                status: "Usuario Inexistente"
            }
            return (respu);
        } else {
            const respu = {
                id: miusuario.id,
                nombre: miusuario.nombre,
                found: true,
                status: "Usuario Ya Existe"

            }
            return (respu);

        }
    }

}
