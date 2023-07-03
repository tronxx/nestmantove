import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
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
        return await this.almacenesRepository.find(
            {
                where: { cia : cia},
                order: { clave: "ASC"}
            }
        );
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
        let clave = dto.clave;
        let cia = dto.cia;
        const xalmacen = await this.almacenesRepository.findOneBy({clave, cia});
        if(xalmacen) {
            throw new NotAcceptableException ('Ya existe ese Almacén');
            return;
        }
        const almacen = this.almacenesRepository.create(dto);
        return await this.almacenesRepository.save(almacen);

    }
}
