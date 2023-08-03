import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccesoriosService } from './accesorios.service';
import { AccesoriosController } from './accesorios.controller';
import { Precioscomb } from '../precioscomb/entities';
import { Renpogas } from '../renpogas/entities';
import { Combust } from '../combust/entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Precioscomb, Renpogas, Combust]),
 ],

  providers: [AccesoriosService],
  controllers: [AccesoriosController]
})
export class AccesoriosModule {}
