import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateInvenDto, EditInvenDto } from './dtos';
import { Inven } from './entities';

@Injectable()
export class InvenService {


    constructor (
        @InjectRepository(Inven)
        private readonly invenRepository: Repository<Inven>
    )
    {}

    async getMany() :Promise <Inven[]>  {
        return await this.invenRepository.find();
    }

    async getManyCia(cia:number) :Promise <Inven[]>  {
        return await this.invenRepository.find(
            {
                where: { cia : cia},
                order: { codigo: "ASC"}
            }
        );
    }

    async getManyCiaLike(cia:number, codigo:string) :Promise <Inven[]>  {
        return await this.invenRepository.find(
            {
                where: { 
                    codigo: Like( codigo),
                    cia : cia
                },
                order: { codigo: "ASC"}
            }
        );
    }

    async getOne(cia: number, id: number) : Promise<Inven> {
        const inven = await this.invenRepository.findOneBy({cia, id});
        if(!inven) throw new NotFoundException ('Inven Inexistente');
       return inven;
    }

    async editOne(id: number, dto: EditInvenDto) {
        const inven = await this.invenRepository.findOneBy({id});
        if(!inven) throw new NotFoundException ('Inven Inexistente');
        const editedInven = Object.assign(inven, dto);
        return await this.invenRepository.update(id, editedInven);

    }

    async deleteOne(id: number) {
        const inven = await this.invenRepository.findOneBy({id});
        if(!inven) throw new NotFoundException ('Inven Inexistente');
        return await this.invenRepository.delete(id);

    }

    async createOne(dto: CreateInvenDto) {
        let codigo = dto.codigo;
        let cia = dto.cia;
        const xinven = await this.invenRepository.findOneBy({codigo, cia});
        if(xinven) {
            throw new NotAcceptableException ('Ya existe ese Código');
            return;
        }
        const inven = this.invenRepository.create(dto);
        return await this.invenRepository.save(inven);

    }
}
