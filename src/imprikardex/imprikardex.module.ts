import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImprikardexService } from './imprikardex.service';
import { ImprikardexController } from './imprikardex.controller';
import { InvenService } from '../inven/inven.service';
import { AlmacenesService } from '../almacenes/almacenes.service';
import { KardexService } from '../kardex/kardex.service';
import { Kardex, Exist, Series } from '../kardex/entities';
import { Inven } from '../inven/entities';
import { Almacenes } from '../almacenes/entities';
import { Cia } from '../cias/entities';
import { CiaService } from '../cias/cias.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Exist, Kardex, Series, Inven, Almacenes, Cia,
      
    ])
 ],

 providers: [KardexService, ImprikardexService, 
  InvenService, AlmacenesService, CiaService
],

  controllers: [ImprikardexController]
})
export class ImprikardexModule {}
