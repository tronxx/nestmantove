import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVendedorDto, EditVendedorDto } from './dtos';
import { Vendedor } from './entities';

@Injectable()
export class VendedoresService {

    constructor (
        @InjectRepository(Vendedor)
        private readonly VendedoresRepository: Repository<Vendedor>
    )
    {}

    async getMany(cia: number) :Promise <Vendedor[]>  {
        return await this.VendedoresRepository.find(
            {
                where: { cia : cia},
                order: { codigo: "ASC"}
            }
        );
    }

    async getOne(cia:number, id: number) : Promise<Vendedor> {
        const Vendedor = await this.VendedoresRepository.findOneBy({cia, id});
        if(!Vendedor) throw new NotFoundException ('Vendedor Inexistente');
       return Vendedor;
    }

    async editOne(id: number, dto: EditVendedorDto) {
        const Vendedor = await this.VendedoresRepository.findOneBy({id});
        if(!Vendedor) throw new NotFoundException ('Vendedor Inexistente');
        const editedVendedor = Object.assign(Vendedor, dto);
        return await this.VendedoresRepository.update(id, editedVendedor);

    }

    async deleteOne(id: number) {
        const Vendedor = await this.VendedoresRepository.findOneBy({id});
        if(!Vendedor) throw new NotFoundException ('Vendedor Inexistente');
        return await this.VendedoresRepository.delete(id);

    }

    async createOne(dto: CreateVendedorDto) {
        let codigo = dto.codigo;
        let cia = dto.cia;
        const xVendedor = await this.VendedoresRepository.findOneBy({codigo, cia});
        if(xVendedor) {
            throw new NotAcceptableException ('Ya existe ese Vendedor');
            return;
        }

        const Vendedor = this.VendedoresRepository.create(dto);
        return await this.VendedoresRepository.save(Vendedor);

    }

}
