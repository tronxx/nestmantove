import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvenService } from './inven.service';
import { InvenController } from './inven.controller';
import { Inven } from './entities/index';

@Module({
  imports:[
    TypeOrmModule.forFeature([Inven])
  ],

  providers: [InvenService],
  controllers: [InvenController]
})
export class InvenModule {}
