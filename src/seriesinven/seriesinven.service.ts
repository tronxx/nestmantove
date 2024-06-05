import { Injectable,  NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSeriesDto } from '../kardex/dtos';
import { Series } from '../kardex/entities';

@Injectable()
export class SeriesinvenService {

    constructor (
        @InjectRepository(Series)
        private readonly seriesRepository: Repository<Series>
    )
    {}

    async getMany(serie: string) :Promise <Series[]>  {
        return await this.seriesRepository
        .createQueryBuilder("series")
        .where("serie like :serie", { serie })
        .orderBy("serie", "DESC")
        .getMany();
    }

    async getOne(serie:string) : Promise<Series> {
        const miserie = await this.seriesRepository.findOneBy({serie});
        if(!miserie) throw new NotFoundException ('Serie Inexistente');
       return miserie;
    }

    async editOne(id: number, dto: CreateSeriesDto) {
        const miserie = await this.seriesRepository.findOneBy({id});
        if(!miserie) throw new NotFoundException ('Serie Inexistente');
        const editedSerie = Object.assign(miserie, dto);
        return await this.seriesRepository.update(id, editedSerie);

    }

    async deleteOne(id: number) {
        const miserie = await this.seriesRepository.findOneBy({id});
        if(!miserie) throw new NotFoundException ('Serie Inexistente');
        return await this.seriesRepository.delete(id);

    }

    async createOne(dto: CreateSeriesDto) {
        let serie = dto.serie;
        const xserie = await this.seriesRepository.findOneBy({serie});
        if(xserie) {
            throw new NotAcceptableException ('Ya existe esa Serie');
            return;
        }

        const miserie = this.seriesRepository.create(dto);
        return await this.seriesRepository.save(miserie);

    }

    async actualizaSeries(series: [CreateSeriesDto]) {
        let resultado = [];
        for(let unaserie of series) {
            let serie = unaserie.serie;
            const xserie = await this.seriesRepository.findOneBy({serie});
            if(!xserie) {
                const miserie = this.seriesRepository.create(unaserie);
                const nuevaserie = await this.seriesRepository.save(miserie);
                resultado.push(nuevaserie);
            }
        }
        return resultado;
    }

}
