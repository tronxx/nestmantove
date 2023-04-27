import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlmacenesController } from './almacenes.controller';
import { AlmacenesService } from './almacenes.service';
import { Almacenes } from './entities/almacenes.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Almacenes])
  ],
  controllers: [AlmacenesController],
  providers: [AlmacenesService]
})
export class AlmacenesModule {}
