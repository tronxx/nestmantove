import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTalleresDto, EditTalleresDto } from './dtos';
import { Talleres } from './entities';

@Injectable()
export class TalleresService {

    constructor (
        @InjectRepository(Talleres)
        private readonly talleresRepository: Repository<Talleres>
    )
    {}

    async getMany(cia: number) :Promise < Talleres []>  {
        return await this.talleresRepository.findBy({cia});
    }

    async getOne(cia: number, id: number) : Promise<Talleres> {
        const micia = await this.talleresRepository.findOneBy({cia, id});
        if(!micia) throw new NotFoundException ('Taller Inexistente');
       return micia;
    }

    async editOne(id: number, dto: EditTalleresDto) {
        const micia = await this.talleresRepository.findOneBy({id});
        if(!micia) throw new NotFoundException ('Taller Inexistente');
        const editedCia = Object.assign(micia, dto);
        return await this.talleresRepository.update(id, editedCia);

    }

    async deleteOne(id: number) {
        const micia = await this.talleresRepository.findOneBy({id});
        if(!micia) throw new NotFoundException ('Taller Inexistente');
        return await this.talleresRepository.delete(id);

    }

    async createOne(dto: CreateTalleresDto) {
        const micia = this.talleresRepository.create(dto);
        return await this.talleresRepository.save(micia);

    }

}
