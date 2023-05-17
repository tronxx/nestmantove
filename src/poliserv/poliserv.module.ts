import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoliservService } from './poliserv.service';
import { PoliservController} from './poliserv.controller'
import { Poliserv } from './entities'

@Module({
  imports:[
    TypeOrmModule.forFeature([Poliserv])
  ],
  controllers: [PoliservController],
  providers: [PoliservService]
})
export class PoliservModule {}
