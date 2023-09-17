import { Module } from '@nestjs/common';
import { CiasedoctaService } from './ciasedocta.service';
import { CiasedoctaController } from './ciasedocta.controller';
import { Ciasedocta } from './entities/ciasedocta.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Ciasedocta])
  ],
  providers: [CiasedoctaService],
  controllers: [CiasedoctaController]
})
export class CiasedoctaModule {}
