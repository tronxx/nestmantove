import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCombustDto, EditCombustDto } from './dtos';
import { Combust } from './entities';
import { Precioscomb } from '../precioscomb/entities';
import { CreatePreciosCombDto } from '../precioscomb/dtos';
import { PrecioscombService } from '../precioscomb/precioscomb.service';
import { Transform } from 'class-transformer';
import { moveMessagePortToContext } from 'worker_threads';

@Injectable()
export class CombustService {

    constructor (
        @InjectRepository(Combust)
        private readonly CombustRepository: Repository<Combust>,
        @InjectRepository(Precioscomb)
        private readonly precioscombRepo: Repository< Precioscomb>
        
    )
    {}

    async getMany(cia: number) :Promise <Combust[]>  {
        return await this.CombustRepository.find(
            {
                where: { cia : cia},
                order: { clave: "ASC"}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Combust> {
        const combust = await this.CombustRepository.findOneBy({cia, id});
        if(!combust) throw new NotFoundException ('Combustible Inexistente');
       return combust;
    }

    async deleteOne(id: number) {
        const combust = await this.CombustRepository.findOneBy({id});
        if(!combust) throw new NotFoundException ('Combustible Inexistente');
        return await this.CombustRepository.delete(id);

    }

    async editOne(id: number, dto: EditCombustDto) {
        const combust = await this.CombustRepository.findOneBy({id});
        if(!combust) throw new NotFoundException ('Combustible Inexistente');
        const editedCombust = Object.assign(combust, dto);
        const combustGuardado = await this.CombustRepository.update(id, editedCombust);
        this.createPreciosComb(combust);
        return combustGuardado;

    }

    async createOne(dto: CreateCombustDto) {
        let clave = dto.clave;
        let cia = dto.cia;
        const xcombust = await this.CombustRepository.findOneBy({clave, cia});
        if(xcombust) {
            throw new NotAcceptableException ('Ya existe esa clave de Combustible');
            return;
        }

        const combust = this.CombustRepository.create(dto);
        const minvocomb = await this.CombustRepository.save(combust);
        this.createPreciosComb(minvocomb);
        return minvocomb;
    }

    async createPreciosComb(combust: Combust) {
        const fecha = new Date();
        const strfecha = fecha.getFullYear().toString() + "-" + (fecha.getMonth() +1 ).toString() + "-" + fecha.getDate().toString();
        const idcombust = combust.id;
        const newprecioscomb = new Precioscomb();
        newprecioscomb.idcombust = combust.id;
        newprecioscomb.cia = combust.cia;
        newprecioscomb.fecha =  strfecha;
        // console.log("Fecha", strfecha);
       
        newprecioscomb.prelit = combust.prelit;
        const data =  await this.precioscombRepo.save(newprecioscomb);
        return data;
    }

}
