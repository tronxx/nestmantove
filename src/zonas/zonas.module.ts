import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZonasService } from './zonas.service';
import { ZonasController } from './zonas.controller';
import { Zonas  } from './entities/index'

@Module({
  imports:[
    TypeOrmModule.forFeature([Zonas])
  ],

  providers: [ZonasService],
  controllers: [ZonasController]
})
export class ZonasModule {}
