import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Precioscomb } from '../precioscomb/entities';
import { Poligas } from '../poligas/entities';
import { Renpogas } from '../renpogas/entities';
import { Poliserv } from 'src/poliserv/entities';
import { Renposerv } from 'src/renposerv/entities';
import { ServMantos } from 'src/servmantos/entities';
import { Talleres } from '../talleres/entities';
import { Vehiculos } from '../vehiculos/entities';

import { Combust } from '../combust/entities';
import { RenpogasService } from '../renpogas/renpogas.service';
import { PoligasService } from '../poligas/poligas.service';
import { PoliservService } from '../poliserv/poliserv.service';
import { RenposervService } from '../renposerv/renposerv.service';
import { AccesoriosService } from '../accesorios/accesorios.service';

import { Cia } from '../cias/entities';
import { CiaService } from '../cias/cias.service';


import { InformecombService } from './informecomb.service';
import { InformecombController } from './informecomb.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([
       Precioscomb, Renpogas, Poligas, Combust, Cia, Vehiculos,
       Poliserv, Talleres, ServMantos, Renposerv,
      ]),
    ],

  providers: [InformecombService, PoligasService, CiaService, RenpogasService,
    AccesoriosService, PoliservService, RenposervService],
  controllers: [InformecombController]
})
export class InformecombModule {}
