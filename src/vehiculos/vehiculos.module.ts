import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculosController } from './vehiculos.controller';
import { VehiculosService} from './vehiculos.service';
import { Vehiculos } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Vehiculos])
  ],
  providers: [VehiculosService],
  controllers: [VehiculosController]
})
export class VehiculosModule {}
