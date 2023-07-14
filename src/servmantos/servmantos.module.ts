import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServmantosController } from './servmantos.controller';
import { ServmantosService } from './servmantos.service';
import { ServMantos } from './entities';
import { ServmantosxVehiculo } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([ServMantos, ServmantosxVehiculo]),
  ],

  controllers: [ServmantosController],
  providers: [ServmantosService]
})
export class ServmantosModule {}
