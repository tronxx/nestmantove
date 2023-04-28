import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadosController } from './estados.controller';
import { EstadosService } from './estados.service';
import { Estados } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Estados])
  ],

  controllers: [EstadosController],
  providers: [EstadosService]
})
export class EstadosModule {}
