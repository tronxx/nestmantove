import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcasvehController } from './marcasveh.controller';
import { MarcasvehService } from './marcasveh.service';
import { Marcasveh } from './entities/index'

@Module({
  imports:[
    TypeOrmModule.forFeature([Marcasveh])
  ],
  controllers: [MarcasvehController],
  providers: [MarcasvehService]
})
export class MarcasvehModule {}
