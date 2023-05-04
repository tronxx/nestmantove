import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoligasController } from './poligas.controller';
import { PoligasService } from './poligas.service';
import { Poligas } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Poligas])
  ],
  controllers: [PoligasController],
  providers: [PoligasService]
})
export class PoligasModule {}
