
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCiudadesDto, EditCiudadesDto } from './dtos';
import { Ciudades } from './entities';

@Injectable()
export class CiudadesService {

    constructor (
        @InjectRepository(Ciudades)
        private readonly CiudadesesRepository: Repository<Ciudades>
    )
    {}

    async getMany(cia: number) :Promise <Ciudades[]>  {
        return await this.CiudadesesRepository.find(
            {
                where: { cia : cia},
                order: { ciudad: "ASC"}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Ciudades> {
        const ciudad = await this.CiudadesesRepository.findOneBy({cia, id});
        if(!ciudad) throw new NotFoundException ('Ciudad Inexistente');
       return ciudad;
    }

    async editOne(id: number, dto: EditCiudadesDto) {
        const ciudad = await this.CiudadesesRepository.findOneBy({id});
        if(!ciudad) throw new NotFoundException ('Ciudad Inexistente');
        const editedCiudades = Object.assign(ciudad, dto);
        return await this.CiudadesesRepository.update(id, editedCiudades);

    }

    async deleteOne(id: number) {
        const ciudad = await this.CiudadesesRepository.findOneBy({id});
        if(!ciudad) throw new NotFoundException ('Ciudad Inexistente');
        return await this.CiudadesesRepository.delete(id);

    }

    async createOne(dto: CreateCiudadesDto) {
        const ciudad = this.CiudadesesRepository.create(dto);
        return await this.CiudadesesRepository.save(ciudad);

    }


}
