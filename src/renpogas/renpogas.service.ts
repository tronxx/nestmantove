import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateRenpogasDto, EditRenpogasDto } from './dtos';
import { Poligas } from '../poligas/entities';
import { Renpogas } from './entities';
import { Vehiculos } from '../vehiculos/entities';
import { Chofer } from '../choferes/entities';
import { Combust } from '../combust/entities';
import { Zonas } from '../zonas/entities';

@Injectable()
export class RenpogasService {

    constructor (
        @InjectRepository(Poligas)
        private readonly poligasRepository: Repository<Poligas>,
        @InjectRepository(Vehiculos)
        private readonly vehiculoRepository: Repository<Vehiculos>,
        @InjectRepository(Renpogas)
        private readonly renpogasRepository: Repository<Renpogas>

    )
    {}

    async getManyxRenpogas(cia: number, idpoligas: number) :Promise < any >  {
        //const query = await this.vehiculosRepository.createQueryBuilder('a')
      
      //.innerJoinAndMapOne("a.idmarcaveh", Marcasveh, 'b', 'a.idmarca  = b.id ')
      //.where("a.cia = :micia", {micia:cia});
      

        const query = await this.renpogasRepository.createQueryBuilder('a')
        .select(['a.*','b.codigo as codigovehiculo',
        'a.recorr / a.litros as rendto',
        'b.descri as nombrevehiculo',
        'c.clave as clavegas',
        'd.codigo as codigochofer',
        'e.nombre as nombrezona'
        ])
        //.innerJoinAndSelect(Marcasveh, 'b', 'a.idmarcaveh = b.id')
        .leftJoin(Vehiculos, 'b', 'a.idvehiculo = b.id')
        .leftJoin(Combust, 'c', 'a.idcombust = c.id')
        .leftJoin(Chofer, 'd', 'a.idchofer = d.id')
        .leftJoin(Zonas, 'e', 'a.idzona = e.id')
        .where("a.idpoligas = :idpoligas ", {idpoligas:idpoligas})
        .orderBy( {conse: 'ASC'})
        const respu =  await query.getRawMany();
        //console.log(query.getSql(), "respu:", respu);
        return (respu);
    }

    async getManyxVehixFecha(
        cia: number, vehiculoini: number, vehiculofin: number, fechaini: string, fechafin: string
        ) :Promise < any >  {
        //const query = await this.vehiculosRepository.createQueryBuilder('a')
      
      //.innerJoinAndMapOne("a.idmarcaveh", Marcasveh, 'b', 'a.idmarca  = b.id ')
      //.where("a.cia = :micia", {micia:cia});
      

        const query = await this.renpogasRepository.createQueryBuilder('a')
        .select(['a.*','b.codigo as codigovehiculo',
        'f.fecha as fecha',
        'a.recorr / a.litros as rendto',
        'b.descri as nombrevehiculo',
        'c.clave as clavegas',
        'd.codigo as codigochofer',
        'e.nombre as nombrezona'
        ])
        //.innerJoinAndSelect(Marcasveh, 'b', 'a.idmarcaveh = b.id')
        .leftJoin(Vehiculos, 'b', 'a.idvehiculo = b.id')
        .leftJoin(Poligas, 'f', 'a.idpoligas = f.id')
        .leftJoin(Combust, 'c', 'a.idcombust = c.id')
        .leftJoin(Chofer, 'd', 'a.idchofer = d.id')
        .leftJoin(Zonas, 'e', 'a.idzona = e.id')
        .where('f.fecha BETWEEN :startDate AND :endDate', {
            startDate: fechaini,
            endDate: fechafin,
         })
         .andWhere('b.codigo BETWEEN  :vehiculoini and :vehiculofin', { 
            vehiculoini:vehiculoini,
            vehiculofin: vehiculofin 
        })
        .andWhere('a.cia =:cia', {cia})
        .orderBy( {
            codigovehiculo:'ASC', 
            fecha:'ASC', 
            conse: 'ASC'
        })
        const respu =  await query.getRawMany();
        //console.log(query.getSql(), "respu:", respu);
        return (respu);
    }

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
        const datosrenpogas = {
            idvehiculo : miRenpogas.idvehiculo,
            kmtact : miRenpogas.kmtact,
            recorre : dto.recorr - miRenpogas.recorr
        }
        const modifvehiculo = await this.updatevehiculo(datosrenpogas);
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

    async updatevehiculo(datosrenpogas: any) {
        const id = datosrenpogas.idvehiculo;
        const mivehiculo = await this.vehiculoRepository.findOneBy({id});
        mivehiculo.kilom = datosrenpogas.kmtact;
        mivehiculo.tacacu += datosrenpogas.recorre;
        const vehiculo = this.vehiculoRepository.update(id, mivehiculo);
        return (vehiculo);
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
        const datosrenpogas = {
            idvehiculo : miRenpogas.idvehiculo,
            kmtact : miRenpogas.kmtact,
            recorre : miRenpogas.recorr
        }
        const modifvehiculo = await this.updatevehiculo(datosrenpogas);

        return await this.renpogasRepository.save(miRenpogas);

    }

}
