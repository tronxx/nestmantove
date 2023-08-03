import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Almacenes } from 'src/almacenes/entities';
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

    async getManyxFecha(cia: number, fechaini: string, fechafin: string) :Promise < any >  {
        //const query = await this.vehiculosRepository.createQueryBuilder('a')
      
      //.innerJoinAndMapOne("a.idmarcaveh", Marcasveh, 'b', 'a.idmarca  = b.id ')
      //.where("a.cia = :micia", {micia:cia});
      

        const query = await this.poligasRepository.createQueryBuilder('a')
        .select(['a.*','clave','nombre'])
        //.innerJoinAndSelect(Marcasveh, 'b', 'a.idmarcaveh = b.id')
        .leftJoin(Almacenes, 'b', 'a.idalmacen = b.id')
        .where("a.cia = :micia and a.fecha between :fechaini and :fechafin", {micia:cia, fechaini: fechaini, fechafin: fechafin})
        .orderBy( {fecha: 'ASC'})
        const respu =  await query.getRawMany();
        //console.log(query.getSql(), "respu:", respu);
        return (respu);
    }


    async xgetManyxFecha(cia: number, fechaini: string, fechafin: string) :Promise < Poligas []>  {
        return await this.poligasRepository.find({
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
      

        const query = await this.poligasRepository.createQueryBuilder('a')
        .select(['a.*','clave','nombre'])
        //.innerJoinAndSelect(Marcasveh, 'b', 'a.idmarcaveh = b.id')
        .leftJoin(Almacenes, 'b', 'a.idalmacen = b.id')
        .where("a.id = :id ", {id:id})
        const respu =  await query.getRawOne();
        //console.log(query.getSql(), "respu:", respu);
        return (respu);
    }

    async xgetOne(cia: number, id: number) : Promise<Poligas> {
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
        const mioldPoligas =  await this.poligasRepository.findOne({
            where: {
                cia: dto.cia,
                idalmacen: dto.idalmacen,
                fecha: dto.fecha
            }
            });
        if(mioldPoligas) throw new NotFoundException ('Poliza de Gasolina Ya Existe');
        const mipoligas = this.poligasRepository.create(dto);
        return await this.poligasRepository.save(mipoligas);

    }

}
