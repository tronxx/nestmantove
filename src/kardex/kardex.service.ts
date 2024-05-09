import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateKardexDto, EditKardexDto, CreateExistDto, EditExistDto, CreateSeriesDto } from './dtos';
import { Kardex, Exist, Series } from './entities';
import { Almacenes } from 'src/almacenes/entities';

@Injectable()
export class KardexService {


    constructor (
        @InjectRepository(Kardex)
        private readonly KardexRepository: Repository<Kardex>,
        @InjectRepository(Series)
        private readonly SeriesRepository: Repository<Series>,
        @InjectRepository(Almacenes)
        private readonly AlmacenesRepository: Repository<Almacenes>,
        @InjectRepository(Exist)
        private readonly ExistRepository: Repository<Exist>,
    )
    {}

    async getMany() :Promise <Kardex[]>  {
        return await this.KardexRepository.find();
    }

    async getManyCia(cia:number, idalm:number, idart:number) :Promise <any[]>  {
        const query = await this.KardexRepository.createQueryBuilder('a')
        .select(['a.*','b.serie as serie'])
        //.innerJoinAndSelect(Marcasveh, 'b', 'a.idmarcaveh = b.id')
        .leftJoin(Series, 'b', 'a.idserie = b.id')
        .where("a.idalm = :idalm ", {idalm:idalm})
        .andWhere("a.idart = :idart ", {idart:idart})
        .andWhere("a.cia = :cia ", {cia:cia})
        .orderBy( {fecha: 'DESC', folio:'DESC'})
        const respu =  await query.getRawMany();
        //console.log(query.getSql(), "respu:", respu);
        return (respu);

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

    async getManyCiaxFecha(cia:number, idalm:number, idart:number, fechaini: string, fechafin: string) :Promise <any[]>  {
        const query = await this.KardexRepository.createQueryBuilder('a')
        .select(['a.*','b.serie as serie'])
        //.innerJoinAndSelect(Marcasveh, 'b', 'a.idmarcaveh = b.id')
        .leftJoin(Series, 'b', 'a.idserie = b.id')
        .where("a.idalm = :idalm ", {idalm:idalm})
        .andWhere("a.idart = :idart ", {idart:idart})
        .andWhere("a.cia = :cia ", {cia:cia})
        .andWhere("(a.fecha between :fechaini and :fechafin \
            or a.fechasale between :fechaini and :fechafin)", 
            {fechaini, fechafin})
        .orderBy( {fecha: 'DESC', folio:'DESC'})
        const respu =  await query.getRawMany();
        //console.log(query.getSql(), "respu:", respu);
        return (respu);

        return await this.KardexRepository.find(
            {
                where: { idalm:idalm, idart:idart, cia : cia},
                order: { fecha: "ASC"}
            }
        );
    }



    async getOne(id: number) : Promise<Kardex> {
        const Kardex = await this.KardexRepository.findOneBy({id});
        if(!Kardex) throw new NotFoundException ('Kardex Inexistente');
        return Kardex;
    }

    async getLastFolio(idart: number, idalm: number) : Promise<number> {
        const result = await this.KardexRepository
        .createQueryBuilder('kardex')
        .select('MAX(kardex.folio)', 'maxFolio')
        .where('kardex.idalm = :idalm', { idalm })
        .andWhere('kardex.idart = :idart', { idart })
        .getRawOne();
      return result.maxFolio || 0; // Devuelve 0 si no se encuentra ningún folio
      
    }

    async editOne(id: number, dto: EditKardexDto) {
        const Kardex = await this.KardexRepository.findOneBy({id});
        let afectaKardex = false;
        if(!Kardex) throw new NotFoundException ('Kardex Inexistente');
        let dtoCreate = {
            idalm :Kardex.idalm,
            idart :Kardex.idart,
            canti : Kardex.canti,
            cia: Kardex.cia
        }

        if( Kardex.salio != dto.salio) {
            afectaKardex = true;
            if(Kardex.salio == "S") {
                dtoCreate.canti = dtoCreate.canti * -1;
            }
            let entraosale = "S";
            const exist = this.updateexist(dtoCreate, entraosale);
        }
        const editedKardex = Object.assign(Kardex, dto);
        return await this.KardexRepository.update(id, editedKardex);

    }

    async deleteOne(id: number) {
        const Kardex = await this.KardexRepository.findOneBy({id});
        if(!Kardex) throw new NotFoundException ('Kardex Inexistente');
        let dtoCreate = {
            idalm :Kardex.idalm,
            idart :Kardex.idart,
            canti : Kardex.canti,
            cia: Kardex.cia
        }

        dtoCreate.canti = dtoCreate.canti * -1;
        let entraosale = "E";
        const exist = this.updateexist(dtoCreate, entraosale);
        return await this.KardexRepository.delete(id);

    }

    async updateexist(dto: {idalm: number, idart:number, canti:number, cia:number}, entosal: string) {
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
