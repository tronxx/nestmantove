import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServMantoDto, EditServMantosDto } from './dtos';
import { ServMantos } from './entities';
 
@Injectable()
export class  ServmantosService {

    constructor (
        @InjectRepository(ServMantos)
        private readonly ervmantosRepository: Repository<ServMantos>
    )
    {}

    async getMany() :Promise <ServMantos[]>  {
        return await this.ervmantosRepository.find();
    }

    async getManyCia(cia:number) :Promise <ServMantos[]>  {
        return await this.ervmantosRepository.findBy({cia})
    }

    async getOne(cia: number, id: number) : Promise<ServMantos> {
        const servmanto = await this.ervmantosRepository.findOneBy({cia, id});
        if(!servmanto) throw new NotFoundException ('Servicio Inexistente');
       return servmanto;
    }

    async editOne(id: number, dto: EditServMantosDto) {
        const servmanto = await this.ervmantosRepository.findOneBy({id});
        if(!servmanto) throw new NotFoundException ('Servicio Inexistente');
        const editedServmnto  = Object.assign(servmanto, dto);
        return await this.ervmantosRepository.update(id, editedServmnto);

    }

    async deleteOne(id: number) {
        const servmanto = await this.ervmantosRepository.findOneBy({id});
        if(!servmanto) throw new NotFoundException ('Servicio Inexistente');
        return await this.ervmantosRepository.delete(id);

    }

    async createOne(dto: CreateServMantoDto) {
        const servmanto = this.ervmantosRepository.create(dto);
        return await this.ervmantosRepository.save(servmanto);

    }
}
