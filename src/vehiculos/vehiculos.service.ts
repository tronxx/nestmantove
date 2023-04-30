import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        return await this.vehiculosRepository.findBy({cia});
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
        const vehiculo = this.vehiculosRepository.create(dto);
        return await this.vehiculosRepository.save(vehiculo);

    }

}
