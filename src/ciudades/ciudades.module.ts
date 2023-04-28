import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadesController } from './ciudades.controller';
import { CiudadesService } from './ciudades.service';
import { Ciudades } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Ciudades])
  ],

  controllers: [CiudadesController],
  providers: [CiudadesService]
})
export class CiudadesModule {}
