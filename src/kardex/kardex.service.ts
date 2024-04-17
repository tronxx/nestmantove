import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateKardexDto, EditKardexDto, CreateExistDto, EditExistDto, CreateSeriesDto } from './dtos';
import { Kardex, Exist, Series } from './entities';

@Injectable()
export class KardexService {


    constructor (
        @InjectRepository(Kardex)
        private readonly KardexRepository: Repository<Kardex>,
        @InjectRepository(Series)
        private readonly SeriesRepository: Repository<Series>,
        @InjectRepository(Exist)
        private readonly ExistRepository: Repository<Exist>
    )
    {}

    async getMany() :Promise <Kardex[]>  {
        return await this.KardexRepository.find();
    }

    async getManyCia(cia:number, idalm:number, idart:number) :Promise <Kardex[]>  {
        return await this.KardexRepository.find(
            {
                where: { idalm:idalm, idart:idart, cia : cia},
                order: { fecha: "ASC"}
            }
        );
    }

    async getManyCiaLike(cia:number, codigo:string) :Promise <Kardex[]>  {
        return await this.KardexRepository.find(
            {
                where: { 
                    cia : cia
                },
                order: { fecha: "ASC"}
            }
        );
    }

    async getOne(cia: number, id: number) : Promise<Kardex> {
        const Kardex = await this.KardexRepository.findOneBy({cia, id});
        if(!Kardex) throw new NotFoundException ('Kardex Inexistente');
       return Kardex;
    }

    async editOne(id: number, dto: EditKardexDto) {
        const Kardex = await this.KardexRepository.findOneBy({id});
        if(!Kardex) throw new NotFoundException ('Kardex Inexistente');
        const editedKardex = Object.assign(Kardex, dto);
        return await this.KardexRepository.update(id, editedKardex);

    }

    async deleteOne(id: number) {
        const Kardex = await this.KardexRepository.findOneBy({id});
        if(!Kardex) throw new NotFoundException ('Kardex Inexistente');
        return await this.KardexRepository.delete(id);

    }

    async updateexist(dto: CreateKardexDto, entosal: string) {
        const idalm = dto.idalm;
        const idart = dto.idart;
        const canti = dto.canti;
        const cia = dto.cia;
        let id = 0;
        let nvaexist  = new CreateExistDto();

        let agregar=false;
        let miexist = await this.ExistRepository.findOneBy({idart, idalm});
        if(!miexist) {
            agregar=true;
            miexist = new Exist();
            miexist.entran=0;
            miexist.salen=0;
            miexist.inicial=0;
            miexist.exist=0;
            miexist.cia=cia;
            miexist.idart = idart;
            miexist.idalm = idalm;
        }
        if(entosal == "E" ) {
            miexist.entran += canti;
            miexist.exist += canti;
        } else {
            miexist.salen += canti;
            miexist.exist -= canti;
        }
        if(agregar) {
            const nvaexist = this.ExistRepository.create(miexist);
            return await this.ExistRepository.save(miexist);
        } else {
            return await this.ExistRepository.update(miexist.id, miexist);
        }
    }

    async buscaIdSerie(serie: string) {
        const miserie = await this.SeriesRepository.findOneBy({serie});
        if(!miserie) {
            let nvaserie  = new CreateSeriesDto();
            nvaserie.serie = serie;
            return await this.SeriesRepository.save(nvaserie);
        }
        return miserie;
    }


    async createOne(dto: CreateKardexDto) {
        let cia = dto.cia;
        let idalm = dto.idalm;
        let idart = dto.idart;
        const serie = await this.buscaIdSerie(dto.serie);
        dto.idserie = serie.id;
        const Kardex = this.KardexRepository.create(dto);
        const exist = this.updateexist(dto, "E");
        return await this.KardexRepository.save(Kardex);

    }
}
