import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCiaDto, EditCiaDto } from './dtos';
import { Cia } from './entities';

@Injectable()
export class CiaService {

    constructor (
        @InjectRepository(Cia)
        private readonly ciaRepository: Repository<Cia>
    )
    {}

    async getMany() :Promise <Cia[]>  {
        return await this.ciaRepository.find();
    }

    async getOne(cia: number) : Promise<Cia> {
        const micia = await this.ciaRepository.findOneBy({cia});
        if(!micia) throw new NotFoundException ('Compañía Inexistente');
       return micia;
    }

    async editOne(cia: number, dto: EditCiaDto) {
        const micia = await this.ciaRepository.findOneBy({cia});
        if(!micia) throw new NotFoundException ('Compañía Inexistente');
        const editedCia = Object.assign(micia, dto);
        return await this.ciaRepository.update(cia, editedCia);

    }

    async deleteOne(cia: number) {
        const micia = await this.ciaRepository.findOneBy({cia});
        if(!micia) throw new NotFoundException ('Compañía Inexistente');
        return await this.ciaRepository.delete(cia);

    }

    async createOne(dto: CreateCiaDto) {
        const rfc = dto.rfc;
        const micia1 = await this.ciaRepository.findOneBy({rfc});
        if(micia1) throw new NotAcceptableException ('Ya existe ese RFC de la Compañía');
        const micia = this.ciaRepository.create(dto);
        return await this.ciaRepository.save(micia);

    }

    async busca_rfc_cia(rfc : string) {
        const micia1 = await this.ciaRepository.findOneBy({rfc});
        if(!micia1) {
            const respu = {
                id: -1,
                nombre: "-1",
                found: false,
                status: "Comnpañía Inexistente"
            }
            return (respu);
        } else {
            const respu = {
                id: micia1.cia,
                nombre: micia1.razon,
                found: true,
                status: "Compañía Ya Existe"

            }
            return (respu);

        }
    }

}
