import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChoferDto, EditChoferDto } from './dtos';
import { Chofer } from './entities';

@Injectable()
export class ChoferesService {

    constructor (
        @InjectRepository(Chofer)
        private readonly choferesRepository: Repository<Chofer>
    )
    {}

    async getMany(cia: number) :Promise <Chofer[]>  {
        return await this.choferesRepository.find(
            {
                where: { cia : cia},
                order: { codigo: "ASC"}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Chofer> {
        const chofer = await this.choferesRepository.findOneBy({cia, id});
        if(!chofer) throw new NotFoundException ('Chofer Inexistente');
       return chofer;
    }

    async editOne(id: number, dto: EditChoferDto) {
        const chofer = await this.choferesRepository.findOneBy({id});
        if(!chofer) throw new NotFoundException ('Chofer Inexistente');
        const editedChofer = Object.assign(chofer, dto);
        return await this.choferesRepository.update(id, editedChofer);

    }

    async deleteOne(id: number) {
        const chofer = await this.choferesRepository.findOneBy({id});
        if(!chofer) throw new NotFoundException ('Chofer Inexistente');
        return await this.choferesRepository.delete(id);

    }

    async createOne(dto: CreateChoferDto) {
        let codigo = dto.codigo;
        let cia = dto.cia;
        const xchofer = await this.choferesRepository.findOneBy({codigo, cia});
        if(xchofer) {
            throw new NotAcceptableException ('Ya existe ese Chofer');
            return;
        }

        const chofer = this.choferesRepository.create(dto);
        return await this.choferesRepository.save(chofer);

    }

}
