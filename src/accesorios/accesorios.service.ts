import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, Raw } from 'typeorm';
import { MAX } from 'class-validator';
import { Precioscomb } from '../precioscomb/entities';
import { Renpogas } from '../renpogas/entities';
import { Combust } from '../combust/entities';

@Injectable()
export class AccesoriosService {

    constructor (
        @InjectRepository(Precioscomb)
        private readonly PrecioscombRepository: Repository<Precioscomb>,
        @InjectRepository(Renpogas)
        private readonly RenpogasRepository: Repository<Renpogas>,
    )
    {}

    async obtenerValorMasReciente(idcombust: number, fecha: string): Promise<any> {
        // Obtener el valor más reciente de prelit para el idcombust y la fecha dada
        const precios = await this.PrecioscombRepository.find({
          where: {
            idcombust: idcombust,
            fecha: LessThan(fecha), // Menor o igual a la fecha dada
          },
          order: {
            fecha: 'DESC', // Ordenar por fecha de manera descendente (el más reciente primero)
          },
          take: 1, // Obtener solo el primer resultado (el más reciente)
        });
        return precios;
    
        // if (precios && precios.length > 0) {
        //   return precios[0].prelit;
        // } else {
        //   return 0; // Si no se encuentra un valor, devolver 0 o el valor que consideres apropiado
        // }
      }
    
      async findLatestKmtactByDateAndVehicleId(fecha: string, idvehiculo: number): Promise<any> {
        const latestRenpogas = await this.RenpogasRepository
          .createQueryBuilder('renpogas')
          .select('renpogas.kmtact', 'kmtact')
          .where('renpogas.idvehiculo = :idvehiculo', { idvehiculo })
          .andWhere('renpogas.fecnot <= :fecha', { fecha })
          .orderBy('renpogas.fecnot', 'DESC')
          .limit(1)
          .getRawOne();
        //console.log("Registro Hallado:", latestRenpogas);
        return latestRenpogas;
      }
}
