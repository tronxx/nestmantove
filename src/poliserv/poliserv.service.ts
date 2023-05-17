import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreatePoliservDto,  EditPoliservDto } from './dtos';
import { Poliserv } from './entities';

@Injectable()
export class PoliservService {

    constructor (
        @InjectRepository(Poliserv)
        private readonly poliservRepository: Repository<Poliserv>,
    )
    {}

    async getMany(cia: number) :Promise < Poliserv []>  {
        return await this.poliservRepository.findBy({cia});
    }

    async getManyxFecha(cia: number, fechaini: string, fechafin: string) :Promise < Poliserv []>  {
        return await this.poliservRepository.find({
                where: {
                    cia: cia,
                    fecha: Between (fechaini, fechafin)
                },
                order: { fecha: 'ASC'}
        });
    }

    async getOne(cia: number, id: number) : Promise<Poliserv> {
        const miPoliserv = await this.poliservRepository.findOneBy({cia, id});
        if(!miPoliserv) throw new NotFoundException ('Poliza de Servicio Inexistente');
//        const mirenpogas = await this.renpogasRepository.find( {
//            where: { idPoliserv: id},
//            order: { conse: 'ASC'}
//        });
//        const mipoliza = { Poliserv: miPoliserv, renpogas: mirenpogas }
       return miPoliserv;
    }

    async editOne(id: number, dto: EditPoliservDto) {
        const miPoliserv = await this.poliservRepository.findOneBy({id});
        if(!miPoliserv) throw new NotFoundException ('Poliza de Servicio Inexistente');
        const editedPoliserv = Object.assign(miPoliserv, dto);
        return await this.poliservRepository.update(id, editedPoliserv);

    }

    async deleteOne(id: number) {
        const miPoliserv = await this.poliservRepository.findOneBy({id});
        if(!miPoliserv) throw new NotFoundException ('Poliza de Servicio Inexistente');
        return await this.poliservRepository.delete(id);

    }

    async createOne(dto: CreatePoliservDto) {
        const mioldPoliserv =  await this.poliservRepository.findOne({
            where: {
                cia: dto.cia,
                idalmacen: dto.idalmacen,
                fecha: dto.fecha
            }
            });
        if(mioldPoliserv) throw new NotFoundException ('Poliza de Servicio Ya Existe');
        const miPoliserv = this.poliservRepository.create(dto);
        return await this.poliservRepository.save(miPoliserv);

    }

}
