import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Almacenes } from 'src/almacenes/entities';
import { Between, Repository } from 'typeorm';
import { CreateCiasedoctaDto, EditCiasedooctaDto } from './dtos';
import { Ciasedocta } from './entities';

@Injectable()
export class CiasedoctaService {

    constructor (
        @InjectRepository(Ciasedocta)
        private readonly ciasedoctaRepository: Repository<Ciasedocta>,
    )
    {}

    async getMany(cia: number) :Promise < any>  {
        const query = await this.ciasedoctaRepository.createQueryBuilder('a')
        .select(['a.*'])
        .addSelect(`CASE when a.coa = 'C' then importe  else null END`, "cargos")
        .addSelect(`CASE when a.coa = 'A' then a.importe else null END`, "abonos")
        .addSelect(`CASE when a.tipo = 'B' then "BONIFICACION" else "EFECTIVO" END`, "tipocompleto")
        .where("a.cia = :cia ", {cia: cia})
        .orderBy( {fecha: 'ASC'})
        const respu =  await query.getRawMany();
        //console.log(query.getSql(), "respu:", respu);
        return (respu);
    }

    async xgetMany(cia: number) :Promise < Ciasedocta []>  {
        return await this.ciasedoctaRepository.findBy({cia});
    }

    async getManyxFecha(cia: number, fechaini: string, fechafin: string) :Promise < any >  {
        //const query = await this.vehiculosRepository.createQueryBuilder('a')
      
      //.innerJoinAndMapOne("a.idmarcaveh", Marcasveh, 'b', 'a.idmarca  = b.id ')
      //.where("a.cia = :micia", {micia:cia});
      

        const query = await this.ciasedoctaRepository.createQueryBuilder('a')
        .select(['a.*'])
        //.innerJoinAndSelect(Marcasveh, 'b', 'a.idmarcaveh = b.id')
        .where("a.cia = :micia and a.fecha between :fechaini and :fechafin", {micia:cia, fechaini: fechaini, fechafin: fechafin})
        .orderBy( {fecha: 'ASC'})
        const respu =  await query.getRawMany();
        //console.log(query.getSql(), "respu:", respu);
        return (respu);
    }


    async xgetManyxFecha(cia: number, fechaini: string, fechafin: string) :Promise < Ciasedocta []>  {
        return await this.ciasedoctaRepository.find({
                where: {
                    cia: cia,
                    fecha: Between (fechaini, fechafin)
                },
                order: { fecha: 'ASC'}
        });
    }

    async getOne(cia: number, id: number) :Promise < any >  {
        //const query = await this.vehiculosRepository.createQueryBuilder('a')
      
      //.innerJoinAndMapOne("a.idmarcaveh", Marcasveh, 'b', 'a.idmarca  = b.id ')
      //.where("a.cia = :micia", {micia:cia});
      

        const query = await this.ciasedoctaRepository.createQueryBuilder('a')
        .select(['a.*'])
        //.innerJoinAndSelect(Marcasveh, 'b', 'a.idmarcaveh = b.id')
        .where("a.id = :id ", {id:id})
        const respu =  await query.getRawOne();
        //console.log(query.getSql(), "respu:", respu);
        return (respu);
    }

    async xgetOne(cia: number, id: number) : Promise<Ciasedocta> {
        const mipoligas = await this.ciasedoctaRepository.findOneBy({cia, id});
        if(!mipoligas) throw new NotFoundException ('CiasEdocta Inexistente');
//        const mirenpogas = await this.renpogasRepository.find( {
//            where: { idpoligas: id},
//            order: { conse: 'ASC'}
//        });
//        const mipoliza = { poligas: mipoligas, renpogas: mirenpogas }
       return mipoligas;
    }

    async editOne(id: number, dto: EditCiasedooctaDto) {
        const mipoligas = await this.ciasedoctaRepository.findOneBy({id});
        if(!mipoligas) throw new NotFoundException ('CiasEdocta Inexistente');
        const editedPoligas = Object.assign(mipoligas, dto);
        return await this.ciasedoctaRepository.update(id, editedPoligas);

    }

    async deleteOne(id: number) {
        const mipoligas = await this.ciasedoctaRepository.findOneBy({id});
        if(!mipoligas) throw new NotFoundException ('CiasEdocta Inexistente');
        return await this.ciasedoctaRepository.delete(id);

    }

    async createOne(dto: CreateCiasedoctaDto) {
        // const mioldPoligas =  await this.ciasedoctaRepository.findOne({
        //     where: {
        //         cia: dto.cia,
        //         docto: dto.docto,
        //         fecha: dto.fecha
        //     }
        //     });
        const mipoligas = this.ciasedoctaRepository.create(dto);
        return await this.ciasedoctaRepository.save(mipoligas);

    }

}
