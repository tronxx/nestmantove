import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlmacenDto, EditAlmacenDto } from './dtos';
import { Almacenes } from './entities';
 
@Injectable()
export class AlmacenesService {

    constructor (
        @InjectRepository(Almacenes)
        private readonly almacenesRepository: Repository<Almacenes>
    )
    {}

    async getMany() :Promise <Almacenes[]>  {
        return await this.almacenesRepository.find();
    }

    async getManyCia(cia:number) :Promise <Almacenes[]>  {
        return await this.almacenesRepository.findBy({cia})
    }

    async getOne(cia: number, id: number) : Promise<Almacenes> {
        const almacen = await this.almacenesRepository.findOneBy({cia, id});
        if(!almacen) throw new NotFoundException ('Almacen Inexistente');
       return almacen;
    }

    async editOne(id: number, dto: EditAlmacenDto) {
        const almacen = await this.almacenesRepository.findOneBy({id});
        if(!almacen) throw new NotFoundException ('Almacen Inexistente');
        const editedAlmacen = Object.assign(almacen, dto);
        return await this.almacenesRepository.update(id, editedAlmacen);

    }

    async deleteOne(id: number) {
        const almacen = await this.almacenesRepository.findOneBy({id});
        if(!almacen) throw new NotFoundException ('Almacen Inexistente');
        return await this.almacenesRepository.delete(id);

    }

    async createOne(dto: CreateAlmacenDto) {
        const almacen = this.almacenesRepository.create(dto);
        return await this.almacenesRepository.save(almacen);

    }
}
