import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateRenpogasDto, EditRenpogasDto } from './dtos';
import { Poligas } from '../poligas/entities';
import { Renpogas } from './entities';

@Injectable()
export class RenpogasService {

    constructor (
        @InjectRepository(Poligas)
        private readonly poligasRepository: Repository<Poligas>,
        @InjectRepository(Renpogas)
        private readonly renpogasRepository: Repository<Renpogas>

    )
    {}

    async getMany(cia: number, idpoligas: number) :Promise < Renpogas []>  {
        return await this.renpogasRepository.find( {
            where: { idpoligas: idpoligas},
            order: { conse: 'ASC'}
        });
    }


    async getOne(cia: number, id: number) : Promise<Renpogas> {
        const miRenpogas = await this.renpogasRepository.findOneBy({cia, id});
        if(!miRenpogas) throw new NotFoundException ('Poliza de Gasolina Inexistente');
       return miRenpogas;
    }

    async editOne(id: number, dto: EditRenpogasDto) {
        const miRenpogas = await this.renpogasRepository.findOneBy({id});
        if(!miRenpogas) throw new NotFoundException ('Renglon de Poliza de Gasolina Inexistente');
        const datospoligas = {
            antkmt : miRenpogas.kmtant,
            kmtact : miRenpogas.kmtact,
            litros :dto.litros - miRenpogas.litros,
            importe : dto.importe - miRenpogas.importe,
            iva : dto.iva -  miRenpogas.iva,
            recorre : dto.recorr - miRenpogas.recorr,
            idpoligas : miRenpogas.idpoligas,
            idvehiculo : miRenpogas.idvehiculo
        }
        const modifpoligas = await this.updatepoligas(datospoligas);
        const editedRenpogas = Object.assign(miRenpogas, dto);
        return await this.renpogasRepository.update(id, editedRenpogas);

    }

    async updatepoligas(datospoligas: any) {
        const id = datospoligas.idpoligas;
        const mipoligas = await this.poligasRepository.findOneBy({id});
        mipoligas.importe += datospoligas.importe;
        mipoligas.iva += datospoligas.iva;
        mipoligas.total = mipoligas.importe + mipoligas.iva;
        mipoligas.litros += datospoligas.litros;
        mipoligas.kmts += datospoligas.recorre;
        const poligas = this.poligasRepository.update(id, mipoligas);
        return (poligas);
    }

    async deleteOne(id: number) {
        const miRenpogas = await this.renpogasRepository.findOneBy({id});
        if(!miRenpogas) throw new NotFoundException ('Renglon de Póliza de Gasolina Inexistente');
        const datospoligas = {
            antkmt : miRenpogas.kmtant,
            kmtact : miRenpogas.kmtact,
            litros : 0 - miRenpogas.litros,
            importe : 0 - miRenpogas.importe,
            iva :   0 - miRenpogas.iva,
            recorre :  0 - miRenpogas.recorr,
            idpoligas : miRenpogas.idpoligas,
            idvehiculo : miRenpogas.idvehiculo
        }
        const modifpoligas = await this.updatepoligas(datospoligas);
        return await this.renpogasRepository.delete(id);

    }

    async createOne(dto: CreateRenpogasDto) {
        const miRenpogas = this.renpogasRepository.create(dto);
        const datospoligas = {
            antkmt : miRenpogas.kmtant,
            kmtact : miRenpogas.kmtact,
            litros : miRenpogas.litros,
            importe : miRenpogas.importe,
            iva :   miRenpogas.iva,
            recorre :   miRenpogas.recorr,
            idpoligas : miRenpogas.idpoligas,
            idvehiculo : miRenpogas.idvehiculo
        }
        const modifpoligas = await this.updatepoligas(datospoligas);
        return await this.renpogasRepository.save(miRenpogas);

    }

}
