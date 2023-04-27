import { Module } from '@nestjs/common';
import { ChoferesController } from './choferes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoferesService } from './choferes.service';
import { Chofer } from './entities/choferes.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([Chofer])
  ],
  providers: [ChoferesService],
  controllers: [ChoferesController]
})
export class ChoferesModule {}
