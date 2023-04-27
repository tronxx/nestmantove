import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiasController } from './cias.controller';
import { CiaService } from './cias.service';
import { Cia } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Cia])
  ],
  controllers: [CiasController],
  providers: [CiaService]
})
export class CiasModule {}

