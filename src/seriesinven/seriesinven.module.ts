import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesinvenService } from './seriesinven.service';
import { SeriesinvenController } from './seriesinven.controller';
import { Series } from '../kardex/entities';


@Module({
  imports:[
    TypeOrmModule.forFeature([ Series])
 ],

  providers: [SeriesinvenService],
  controllers: [SeriesinvenController]
})
export class SeriesinvenModule {}
