import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Marcasveh } from 'src/marcasveh/entities';
import { Repository, DataSource } from 'typeorm';
import { CreateVehiculosDto, EditVehiculosDto } from './dtos';
import { Vehiculos } from './entities';

@Injectable()
export class VehiculosService {

    constructor (
        @InjectRepository(Vehiculos)
        private readonly vehiculosRepository: Repository<Vehiculos>
    )
    {}

    async getMany(cia: number) :Promise < Vehiculos []>  {
        return await this.vehiculosRepository
        .find(
            {
                where: { cia : cia},
                order: { codigo: "ASC"}
            }
        );
    }

    async getCompleto(cia: number) : Promise <any> {
        //const query = await this.vehiculosRepository.createQueryBuilder('a')
      
      //.innerJoinAndMapOne("a.idmarcaveh", Marcasveh, 'b', 'a.idmarca  = b.id ')
      //.where("a.cia = :micia", {micia:cia});
      

        const query = await this.vehiculosRepository.createQueryBuilder('a')
        .select(['a.*','marca'])
        //.innerJoinAndSelect(Marcasveh, 'b', 'a.idmarcaveh = b.id')
        .leftJoin(Marcasveh, 'b', 'a.idmarcaveh = b.id')
        .where("a.cia = :micia", {micia:cia})

        const respu =  await query.getRawMany();
        console.log(query.getSql(), "respu:", respu);
        return (respu);
    }


    async getOne(cia: number, id: number) : Promise<Vehiculos> {
        const vehiculo = await this.vehiculosRepository.findOneBy({cia, id});
        if(!vehiculo) throw new NotFoundException ('Vehiculo Inexistente');
       return vehiculo;
    }

    async editOne(id: number, dto: EditVehiculosDto) {
        const vehiculo = await this.vehiculosRepository.findOneBy({id});
        if(!vehiculo) throw new NotFoundException ('Vehiculo Inexistente');
        const editedVehiculo = Object.assign(vehiculo, dto);
        return await this.vehiculosRepository.update(id, editedVehiculo);

    }

    async deleteOne(id: number) {
        const vehiculo = await this.vehiculosRepository.findOneBy({id});
        if(!vehiculo) throw new NotFoundException ('Vehiculo Inexistente');
        return await this.vehiculosRepository.delete(id);

    }

    async createOne(dto: CreateVehiculosDto) {
        let codigo = dto.codigo;
        let cia = dto.cia;
        const xtaller = await this.vehiculosRepository.findOneBy({codigo, cia});
        if(xtaller) {
            throw new NotAcceptableException ('Ya existe ese Vehiculo');
            return;
        }
        const vehiculo = this.vehiculosRepository.create(dto);
        return await this.vehiculosRepository.save(vehiculo);

    }

}
