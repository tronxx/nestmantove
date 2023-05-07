import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreatePoligasDto, EditPolizasDto } from './dtos';
import { Poligas } from './entities';

@Injectable()
export class PoligasService {

    constructor (
        @InjectRepository(Poligas)
        private readonly poligasRepository: Repository<Poligas>,
    )
    {}

    async getMany(cia: number) :Promise < Poligas []>  {
        return await this.poligasRepository.findBy({cia});
    }

    async getManyxFecha(cia: number, fechaini: string, fechafin: string) :Promise < Poligas []>  {
        return await this.poligasRepository.find({
                where: {
                    cia: cia,
                    fecha: Between (fechaini, fechafin)
                },
                order: { fecha: 'ASC'}
        });
    }

    async getOne(cia: number, id: number) : Promise<Poligas> {
        const mipoligas = await this.poligasRepository.findOneBy({cia, id});
        if(!mipoligas) throw new NotFoundException ('Poliza de Gasolina Inexistente');
//        const mirenpogas = await this.renpogasRepository.find( {
//            where: { idpoligas: id},
//            order: { conse: 'ASC'}
//        });
//        const mipoliza = { poligas: mipoligas, renpogas: mirenpogas }
       return mipoligas;
    }

    async editOne(id: number, dto: EditPolizasDto) {
        const mipoligas = await this.poligasRepository.findOneBy({id});
        if(!mipoligas) throw new NotFoundException ('Poliza de Gasolina Inexistente');
        const editedPoligas = Object.assign(mipoligas, dto);
        return await this.poligasRepository.update(id, editedPoligas);

    }

    async deleteOne(id: number) {
        const mipoligas = await this.poligasRepository.findOneBy({id});
        if(!mipoligas) throw new NotFoundException ('Poliza de Gasolina Inexistente');
        return await this.poligasRepository.delete(id);

    }

    async createOne(dto: CreatePoligasDto) {
        const mipoligas = this.poligasRepository.create(dto);
        return await this.poligasRepository.save(mipoligas);

    }

}
