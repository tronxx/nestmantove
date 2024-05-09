import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KardexService } from './kardex.service';
import { InvenService } from '../inven/inven.service';
import { AlmacenesService } from '../almacenes/almacenes.service';

import { KardexController } from './kardex.controller';
import { Kardex, Exist, Series } from './entities';
import { Inven } from '../inven/entities';
import { Almacenes } from '../almacenes/entities';

@Module({
  imports:[
     TypeOrmModule.forFeature([Exist, Kardex, Series, Inven, Almacenes])
  ],

  providers: [KardexService, InvenService, AlmacenesService],
  controllers: [KardexController]
})
export class KardexModule {}
