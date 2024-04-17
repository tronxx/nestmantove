import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KardexService } from './kardex.service';
import { KardexController } from './kardex.controller';
import { Kardex, Exist, Series } from './entities';

@Module({
  imports:[
     TypeOrmModule.forFeature([Exist, Kardex, Series])
  ],

  providers: [KardexService],
  controllers: [KardexController]
})
export class KardexModule {}
