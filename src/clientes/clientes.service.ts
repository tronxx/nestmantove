import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {  CreateClientesDto, EditClienteDto } from './dtos';
import { Cliente } from './entities';

@Injectable()
export class ClientesService {

    constructor (
        @InjectRepository(Cliente)
        private readonly ClienteesRepository: Repository<Cliente>
    )
    {}

    async getMany(cia: number) :Promise <Cliente[]>  {
        return await this.ClienteesRepository.find(
            {
                where: { cia : cia},
                order: { codigo: "ASC"}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Cliente> {
        const Cliente = await this.ClienteesRepository.findOneBy({cia, id});
        if(!Cliente) throw new NotFoundException ('Cliente Inexistente');
       return Cliente;
    }

    async editOne(id: number, dto: EditClienteDto) {
        const Cliente = await this.ClienteesRepository.findOneBy({id});
        if(!Cliente) throw new NotFoundException ('Cliente Inexistente');
        const editedCliente = Object.assign(Cliente, dto);
        return await this.ClienteesRepository.update(id, editedCliente);

    }

    async deleteOne(id: number) {
        const Cliente = await this.ClienteesRepository.findOneBy({id});
        if(!Cliente) throw new NotFoundException ('Cliente Inexistente');
        return await this.ClienteesRepository.delete(id);

    }

    async createOne(dto: CreateClientesDto) {
        let codigo = dto.codigo;
        let cia = dto.cia;
        const xCliente = await this.ClienteesRepository.findOneBy({codigo, cia});
        if(xCliente) {
            throw new NotAcceptableException ('Ya existe ese Cliente');
            return;
        }

        const Cliente = this.ClienteesRepository.create(dto);
        return await this.ClienteesRepository.save(Cliente);

    }

}
