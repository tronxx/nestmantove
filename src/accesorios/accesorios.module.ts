import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccesoriosService } from './accesorios.service';
import { AccesoriosController } from './accesorios.controller';
import { Precioscomb } from '../precioscomb/entities';
import { Poligas } from '../poligas/entities';
import { Renpogas } from '../renpogas/entities';
import { Combust } from '../combust/entities';
import { RenpogasService } from '../renpogas/renpogas.service';
import { Vehiculos } from '../vehiculos/entities'

@Module({
  imports:[
    TypeOrmModule.forFeature([
       Precioscomb, Renpogas, Poligas, Combust, Vehiculos
      ]),
 ],

  providers: [AccesoriosService, RenpogasService],
  controllers: [AccesoriosController]
})
export class AccesoriosModule {}
