import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CombustController } from './combust.controller';
import { CombustService } from './combust.service';
import { Combust } from './entities';
import { Precioscomb } from '../precioscomb/entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Combust, Precioscomb])
  ],

  controllers: [CombustController],
  providers: [CombustService]
})
export class CombustModule {}
