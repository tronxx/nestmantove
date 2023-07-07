import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServMantoDto, EditServMantosDto } from './dtos';
import { ServMantos } from './entities';
 
@Injectable()
export class  ServmantosService {

    constructor (
        @InjectRepository(ServMantos)
        private readonly servmantosRepository: Repository<ServMantos>
    )
    {}

    async getMany() :Promise <ServMantos[]>  {
        return await this.servmantosRepository.find();
    }

    async getManyCia(cia:number) :Promise <ServMantos[]>  {
        return await this.servmantosRepository.find(
            {
                where: { cia : cia},
                order: { clave: "ASC"}
            }
        );
    }

    async getOne(cia: number, id: number) : Promise<ServMantos> {
        const servmanto = await this.servmantosRepository.findOneBy({cia, id});
        if(!servmanto) throw new NotFoundException ('Servicio Inexistente');
       return servmanto;
    }

    async editOne(id: number, dto: EditServMantosDto) {
        const servmanto = await this.servmantosRepository.findOneBy({id});
        if(!servmanto) throw new NotFoundException ('Servicio Inexistente');
        const editedServmnto  = Object.assign(servmanto, dto);
        return await this.servmantosRepository.update(id, editedServmnto);

    }

    async deleteOne(id: number) {
        const servmanto = await this.servmantosRepository.findOneBy({id});
        if(!servmanto) throw new NotFoundException ('Servicio Inexistente');
        return await this.servmantosRepository.delete(id);

    }

    async createOne(dto: CreateServMantoDto) {
        let clave = dto.clave;
        let cia = dto.cia;

        const xservmanto = await this.servmantosRepository.findOneBy({cia, clave});
        if(xservmanto)  { 
            throw new NotAcceptableException ('Servicio ya Existe');
            return;
        }
        const servmanto = this.servmantosRepository.create(dto);
        return await this.servmantosRepository.save(servmanto);

    }
}
