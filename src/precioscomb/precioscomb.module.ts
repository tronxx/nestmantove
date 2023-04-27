import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreciosCombController } from './precioscomb.controller';
import { PrecioscombService } from './precioscomb.service';
import { Precioscomb } from './entities'

@Module({
  imports:[
     TypeOrmModule.forFeature([Precioscomb])
  ],

  controllers: [PreciosCombController],
  providers: [PrecioscombService]
})
export class PrecioscombModule {}
