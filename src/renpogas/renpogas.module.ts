import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RenpogasController } from './renpogas.controller';
import { RenpogasService } from './renpogas.service';
import { Renpogas } from './entities';
import { Poligas} from '../poligas/entities';
import { Vehiculos } from '../vehiculos/entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Renpogas, Poligas, Vehiculos])
  ],
  controllers: [RenpogasController],
  providers: [RenpogasService]
})
export class RenpogasModule {}
