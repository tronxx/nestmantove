import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccesoriosService } from './accesorios.service';
import { AccesoriosController } from './accesorios.controller';
import { Precioscomb } from '../precioscomb/entities';
import { Poligas } from '../poligas/entities';
import { Renpogas } from '../renpogas/entities';
import { Combust } from '../combust/entities';
import { RenpogasService } from '../renpogas/renpogas.service';
import { PoligasService } from '../poligas/poligas.service';
import { Vehiculos } from '../vehiculos/entities';
import { Cia } from '../cias/entities';
import { CiaService } from '../cias/cias.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([
       Precioscomb, Renpogas, Poligas, Combust, Cia, Vehiculos
      ]),
 ],

  providers: [
     AccesoriosService, PoligasService, CiaService, RenpogasService
    ],
  controllers: [AccesoriosController]
})
export class AccesoriosModule {}
