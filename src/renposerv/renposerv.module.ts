import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RenposervController } from './renposerv.controller';
import { RenposervService } from './renposerv.service';
import { Renposerv } from './entities';
import { Poliserv } from 'src/poliserv/entities';
import { Vehiculos } from '../vehiculos/entities';
import { Chofer } from '../choferes/entities';
import { Talleres } from '../talleres/entities';
import { ServMantos } from '../servmantos/entities';

@Module({
    imports:[
      TypeOrmModule.forFeature([Renposerv, Vehiculos, 
        Talleres, Chofer, Poliserv, ServMantos])
    ],
    controllers: [RenposervController],
    providers: [RenposervService]
  })
  export class RenposervModule {}
  