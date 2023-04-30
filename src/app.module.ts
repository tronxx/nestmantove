import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlmacenesModule } from './almacenes/almacenes.module';
import { AlmacenesController } from './almacenes/almacenes.controller';
import { AlmacenesService } from './almacenes/almacenes.service';
import { Almacenes } from './almacenes/entities';
import { ChoferesModule } from './choferes/choferes.module';
import { Chofer } from './choferes/entities';
import { Cia } from './cias/entities';
import { CiasModule } from './cias/cias.module';
import { TalleresModule } from './talleres/talleres.module';
import { Talleres } from './talleres/entities';
import { MarcasvehModule } from './marcasveh/marcasveh.module';
import { Marcasveh } from './marcasveh/entities';
import { ZonasModule } from './zonas/zonas.module';
import { Zonas } from './zonas/entities'
import { CombustModule } from './combust/combust.module';
import { Combust } from './combust/entities'
import { PrecioscombModule } from './precioscomb/precioscomb.module';
import { Precioscomb} from './precioscomb/entities';
import { CiudadesModule } from './ciudades/ciudades.module';
import { Ciudades } from './ciudades/entities';
import { EstadosModule } from './estados/estados.module';
import { Estados } from './estados/entities';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { Vehiculos } from './vehiculos/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'mantove',
      entities: [Almacenes, Chofer, Cia, Talleres, Marcasveh, 
        Zonas, Combust, Precioscomb, Ciudades, Estados, Vehiculos,
         join(__dirname, './**/**/*entity{.ts,.js}')],
      synchronize: true,
    }),
    AlmacenesModule,
    ChoferesModule,
    CiasModule,
    TalleresModule,
    MarcasvehModule,
    ZonasModule,
    CombustModule,
    PrecioscombModule,
    CiudadesModule,
    EstadosModule,
    VehiculosModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
