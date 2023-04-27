import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePreciosCombDto, EditPreciosCombDto } from './dtos';
import { Precioscomb } from './entities';

@Injectable()
export class PrecioscombService {

    constructor (
        @InjectRepository(Precioscomb)
        private readonly PrecioscombRepository: Repository<Precioscomb>,
    )
    {}

    async getMany(idcombust: number) :Promise <Precioscomb[]>  {
        return await this.PrecioscombRepository.findBy({idcombust});
    }

    async getOne(idcombust: number, id: number) : Promise<Precioscomb> {
        const Precioscomb = await this.PrecioscombRepository.findOneBy({idcombust, id});
        if(!Precioscomb) throw new NotFoundException ('Precio combustible Inexistente');
       return Precioscomb;
    }

    async editOne(id: number, dto: EditPreciosCombDto) {
        const precioscomb = await this.PrecioscombRepository.findOneBy({id});
        if(!precioscomb) throw new NotFoundException ('Precio combustible Inexistente');
        const editedPrecioscomb = Object.assign(precioscomb, dto);
        return await this.PrecioscombRepository.update(id, editedPrecioscomb);

    }

    async deleteOne(id: number) {
        const precioscomb = await this.PrecioscombRepository.findOneBy({id});
        if(!precioscomb) throw new NotFoundException ('Precio combustible Inexistente');
        return await this.PrecioscombRepository.delete(id);

    }

    async createOne(dto: CreatePreciosCombDto) {
        const id = dto.idcombust;
        const precioscomb = this.PrecioscombRepository.create(dto);
        return await this.PrecioscombRepository.save(precioscomb);
    }

}
