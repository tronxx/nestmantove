import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMarcasvehDto, EditMarcasvehDto } from './dtos';
import { Marcasveh } from './entities';
 
@Injectable()
export class  MarcasvehService {

    constructor (
        @InjectRepository(Marcasveh)
        private readonly marcasRepository: Repository<Marcasveh>
    )
    {}

    async getMany() :Promise <Marcasveh[]>  {
        return await this.marcasRepository.find();
    }

    async getManyCia(cia:number) :Promise <Marcasveh[]>  {
        return await this.marcasRepository.findBy({cia})
    }

    async getOne(cia: number, id: number) : Promise<Marcasveh> {
        const marca = await this.marcasRepository.findOneBy({cia, id});
        if(!marca) throw new NotFoundException ('Marca Inexistente');
       return marca;
    }

    async editOne(id: number, dto: EditMarcasvehDto) {
        const marca = await this.marcasRepository.findOneBy({id});
        if(!marca) throw new NotFoundException ('Marca Inexistente');
        const editedMarca = Object.assign(marca, dto);
        return await this.marcasRepository.update(id, editedMarca);

    }

    async deleteOne(id: number) {
        const marca = await this.marcasRepository.findOneBy({id});
        if(!marca) throw new NotFoundException ('Marca Inexistente');
        return await this.marcasRepository.delete(id);

    }

    async createOne(dto: CreateMarcasvehDto) {
        const marca = this.marcasRepository.create(dto);
        return await this.marcasRepository.save(marca);

    }
}
