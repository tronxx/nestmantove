import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuariosDto, EditUsuariosDto } from './dtos';
import { Usuarios } from './entities';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsuariosService {

    constructor (
        @InjectRepository(Usuarios)
        private readonly usuariosRepository: Repository<Usuarios>,
        private jwtService: JwtService,
    )
    {}

    async getMany(cia: number) :Promise < Usuarios []>  {
        const miusuarios = await this.usuariosRepository.findBy({cia});
        return await this.usuariosRepository.findBy({cia});
    }

    async getOne(cia: number, id: number) : Promise<Usuarios> {
        const miusuario = await this.usuariosRepository.findOneBy({cia, id});
        if(!miusuario) throw new NotFoundException ('Usuario Inexistente');
        return miusuario;
    }

    async getbylogin(login: string, pwd: string) : Promise<any> {
        const miusuario = await this.usuariosRepository.findOneBy({email:login});
        if(!miusuario) throw new NotFoundException ('Usuario Inexistente');
        const checkPassword = await  compare (pwd, miusuario.clave);
        if(!checkPassword) throw new ForbiddenException ('Password Incorrecto');
        const payload = { id: miusuario.id, nombre: miusuario.login};
        const token = this.jwtService.sign(payload);
        const data = {
            usuario: miusuario,
            token
        }
        return data
    }

    async editOne(id: number, dto: EditUsuariosDto) {
        const miusuario = await this.usuariosRepository.findOneBy({id});
        if(!miusuario) throw new NotFoundException ('Usuario Inexistente');
        const { clave  } = dto;
        const plainToHash = await hash( clave, 10);
        dto.clave = plainToHash;
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
        const { clave  } = dto;
        const plainToHash = await hash( clave, 10);
        dto.clave = plainToHash;

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
