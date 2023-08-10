
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateRenposervDto, EditRenposervDto } from './dtos';
import { Poliserv } from '../poliserv/entities';
import { Renposerv } from './entities';
import { Vehiculos } from '../vehiculos/entities';
import { Chofer } from '../choferes/entities';
import { Talleres } from '../talleres/entities';
import { ServMantos } from '../servmantos/entities';

@Injectable()
export class RenposervService {

    constructor (
        @InjectRepository(Poliserv)
        private readonly poliservRepository: Repository<Poliserv>,
        @InjectRepository(Renposerv)
        private readonly renposervRepository: Repository<Renposerv>,
        @InjectRepository(Vehiculos)
        private readonly vehiculoRepository: Repository<Vehiculos>,
        @InjectRepository(Talleres)
        private readonly talleresRepository: Repository<Talleres>,
        @InjectRepository(ServMantos)
        private readonly servmantosRepository: Repository<ServMantos>,

    )
    {}

    async getManyxRenpogas(cia: number, idpoliserv: number) :Promise < any >  {
        //const query = await this.vehiculosRepository.createQueryBuilder('a')
      
      //.innerJoinAndMapOne("a.idmarcaveh", Marcasveh, 'b', 'a.idmarca  = b.id ')
      //.where("a.cia = :micia", {micia:cia});
      

        const query = await this.renposervRepository.createQueryBuilder('a')
        .select(['a.*','b.codigo as codigovehiculo',
        'b.descri as nombrevehiculo',
        'c.clave as clavegas',
        'd.codigo as codigochofer',
        'e.clave as claveserv',
        'e.descri as descriserv',
        'e.servop as servop',
        'f.clave as clavetaller',
        'f.nombre as nombretaller',
        ])
        //.innerJoinAndSelect(Marcasveh, 'b', 'a.idmarcaveh = b.id')
        .leftJoin(Vehiculos, 'b', 'a.idvehiculo = b.id')
        .leftJoin(Chofer, 'd', 'a.idchofer = d.id')
        .leftJoin(ServMantos, 'e', 'a.idservmanto = e.id')
        .leftJoin(Talleres, 'f', 'a.idtaller = f.id')
        .where("a.idpoliserv = :idpoliserv ", {idpoliserv:idpoliserv})
        .orderBy( {conse: 'ASC'})
        const respu =  await query.getRawMany();
        //console.log(query.getSql(), "respu:", respu);
        return (respu);
    }

    async getMany(cia: number, idpoliserv: number) :Promise < Renposerv []>  {
        return await this.renposervRepository.find( {
            where: { idpoliserv: idpoliserv},
            order: { conse: 'ASC'}
        });
    }


    async getOne(cia: number, id: number) : Promise<Renposerv> {
        const miRenposerv = await this.renposervRepository.findOneBy({cia, id});
        if(!miRenposerv) throw new NotFoundException ('Poliza de Servicios Inexistente');
       return miRenposerv;
    }

    async editOne(id: number, dto: EditRenposervDto) {
        const miRenposerv = await this.renposervRepository.findOneBy({id});
        if(!miRenposerv) throw new NotFoundException ('Renglón de Poliza de Servicios Inexistente');
        const datosPoliserv = {
            costo : dto.costo - miRenposerv.costo,
            idpoliserv: miRenposerv.idpoliserv
        }
        const modifPoliserv = await this.updatePoliserv(datosPoliserv);
        const editedRenposerv = Object.assign(miRenposerv, dto);
        return await this.renposervRepository.update(id, editedRenposerv);

    }

    async updatePoliserv(datosPoliserv: any) {
        const id = datosPoliserv.idpoliserv;
        const miPoliserv = await this.poliservRepository.findOneBy({id});
        miPoliserv.total = miPoliserv.total + datosPoliserv.costo;
        const Poliserv = this.poliservRepository.update(id, miPoliserv);
        return (Poliserv);
    }

    async deleteOne(id: number) {
        const miRenposerv = await this.renposervRepository.findOneBy({id});
        if(!miRenposerv) throw new NotFoundException ('Renglon de Póliza de Gasolina Inexistente');
        const datosPoliserv = {
            costo : 0 - miRenposerv.costo,
            idpoliserv: miRenposerv.idpoliserv
        }

        const modifPoliserv = await this.updatePoliserv(datosPoliserv);
        return await this.renposervRepository.delete(id);

    }

    async createOne(dto: CreateRenposervDto) {
        const miRenposerv = this.renposervRepository.create(dto);
        const datosPoliserv = {
            costo : miRenposerv.costo,
            idpoliserv: miRenposerv.idpoliserv
        }
        const modifPoliserv = await this.updatePoliserv(datosPoliserv);
        return await this.renposervRepository.save(miRenposerv);

    }

}
