import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  CreateProveedoresDto, EditProveedorDto } from './dtos';
import { Proveedor } from './entities';

@Injectable()
export class ProveedoresService {

    constructor (
        @InjectRepository(Proveedor)
        private readonly ProveedoresRepository: Repository<Proveedor>
    )
    {}

    async getMany(cia: number) :Promise <Proveedor[]>  {
        return await this.ProveedoresRepository.find(
            {
                where: { cia : cia},
                order: { codigo: "ASC"}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Proveedor> {
        const Proveedor = await this.ProveedoresRepository.findOneBy({cia, id});
        if(!Proveedor) throw new NotFoundException ('Proveedor Inexistente');
       return Proveedor;
    }

    async editOne(id: number, dto: EditProveedorDto) {
        const Proveedor = await this.ProveedoresRepository.findOneBy({id});
        if(!Proveedor) throw new NotFoundException ('Proveedor Inexistente');
        const editedProveedor = Object.assign(Proveedor, dto);
        return await this.ProveedoresRepository.update(id, editedProveedor);

    }

    async deleteOne(id: number) {
        const Proveedor = await this.ProveedoresRepository.findOneBy({id});
        if(!Proveedor) throw new NotFoundException ('Proveedor Inexistente');
        return await this.ProveedoresRepository.delete(id);

    }

    async createOne(dto: CreateProveedoresDto) {
        let codigo = dto.codigo;
        let cia = dto.cia;
        const xProveedor = await this.ProveedoresRepository.findOneBy({codigo, cia});
        if(xProveedor) {
            throw new NotAcceptableException ('Ya existe ese Proveedor');
            return;
        }

        const Proveedor = this.ProveedoresRepository.create(dto);
        return await this.ProveedoresRepository.save(Proveedor);

    }

}
