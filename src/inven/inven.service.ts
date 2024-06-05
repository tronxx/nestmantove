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

    async getSigteAnter(cia: number, codigo: string, hacia:string) : Promise<Inven> {
        let nvocodigo = "";
        let mayoromenor = "";
        let maxmin = "";
        if(hacia == "A") {
            maxmin = 'MAX(a.codigo) as nvocodigo'
            mayoromenor = "a.codigo < :codigo"
        } else {
            maxmin = 'MIN(a.codigo) as nvocodigo'
            mayoromenor = "a.codigo > :codigo"

        }
        const query = await this.invenRepository.createQueryBuilder('a')
        .select(maxmin)
        //.innerJoinAndSelect(Marcasveh, 'b', 'a.idmarcaveh = b.id')
        .where(mayoromenor, {codigo})
        .andWhere("a.cia = :cia ", {cia})
        const respu =  await query.getRawOne();
        //console.log("Mayormenor:", mayoromenor, "maxmin:", maxmin, "respu:", respu)
        if(respu) codigo = respu.nvocodigo

        const inven = await this.invenRepository.findOneBy({cia, codigo});
        if(!inven) throw new NotFoundException ('Inven Inexistente');
       return inven;
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

    async actualizaCatalogo(dto: CreateInvenDto[]) {
        let productosagregados  = [];
        let productosmodificados = [];
        for(let producto of dto) {
            let codigo = producto.codigo;
            let cia = producto.cia;
            const xinven = await this.invenRepository.findOneBy({codigo, cia});
            if(!xinven) {
                let inven = this.invenRepository.create(producto);
                inven.status = 'A';
                inven.entran = 0;
                inven.salen = 0;
                inven.exist = 0;
                inven.inicial = 0;
                const nvoproducto = await this.invenRepository.save(inven);
                productosagregados.push(nvoproducto);
            } else {
                if(xinven.descri != producto.descri 
                    || xinven.tipo != producto.tipo   
                    || xinven.costos != producto.costos
                    || xinven.preciou != producto.preciou
                ) {
                    const editedInven = Object.assign(xinven, producto);
                    const id = xinven.id;
                    const productomodificado =  await this.invenRepository.update(id, editedInven);
                    productosmodificados.push(productomodificado);
                }
            }
        }
        return {
            agregados: productosagregados,
            modificados: productosmodificados
        };

    }


}
