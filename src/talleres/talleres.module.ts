import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalleresController } from './talleres.controller';
import { TalleresService } from './talleres.service';
import { Talleres } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Talleres])
  ],
  controllers: [TalleresController],
  providers: [TalleresService]
})
export class TalleresModule {}
