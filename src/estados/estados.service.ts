import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstadosDto, EditEstadosDto } from './dtos';
import { Estados } from './entities';

@Injectable()
export class EstadosService {

    constructor (
        @InjectRepository(Estados)
        private readonly EstadosRepository: Repository<Estados>
    )
    {}

    async getMany(cia: number) :Promise <Estados[]>  {
        return await this.EstadosRepository.findBy({cia});
    }

    async getOne(cia:number, id: number) : Promise<Estados> {
        const estado = await this.EstadosRepository.findOneBy({cia, id});
        if(!estado) throw new NotFoundException ('Estado Inexistente');
       return estado;
    }

    async editOne(id: number, dto: EditEstadosDto) {
        const estado = await this.EstadosRepository.findOneBy({id});
        if(!estado) throw new NotFoundException ('Estado Inexistente');
        const editedEstados = Object.assign(Estados, dto);
        return await this.EstadosRepository.update(id, editedEstados);

    }

    async deleteOne(id: number) {
        const estado = await this.EstadosRepository.findOneBy({id});
        if(!estado) throw new NotFoundException ('Estado Inexistente');
        return await this.EstadosRepository.delete(id);

    }

    async createOne(dto: CreateEstadosDto) {
        const estado = this.EstadosRepository.create(dto);
        return await this.EstadosRepository.save(estado);

    }


}
