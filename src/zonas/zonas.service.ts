import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateZonasDto, EditZonasDto } from './dtos';
import { Zonas } from './entities';
 
@Injectable()
export class  ZonasService {

    constructor (
        @InjectRepository(Zonas)
        private readonly zonasRepository: Repository<Zonas>
    )
    {}

    async getMany() :Promise <Zonas[]>  {
        return await this.zonasRepository.find();
    }

    async getManyCia(cia:number) :Promise <Zonas[]>  {
        return await this.zonasRepository.findBy({cia})
    }

    async getOne(cia: number, id: number) : Promise<Zonas> {
        const registro = await this.zonasRepository.findOneBy({cia, id});
        if(!registro) throw new NotFoundException ('Zona Inexistente');
       return registro;
    }

    async editOne(id: number, dto: EditZonasDto) {
        const registro = await this.zonasRepository.findOneBy({id});
        if(!registro) throw new NotFoundException ('Zona Inexistente');
        const editedRegistro = Object.assign(registro, dto);
        return await this.zonasRepository.update(id, editedRegistro);

    }

    async deleteOne(id: number) {
        const registro = await this.zonasRepository.findOneBy({id});
        if(!registro) throw new NotFoundException ('Zona Inexistente');
        return await this.zonasRepository.delete(id);

    }

    async createOne(dto: CreateZonasDto) {
        const zona = this.zonasRepository.create(dto);
        return await this.zonasRepository.save(zona);

    }
}
