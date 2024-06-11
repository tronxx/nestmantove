import { Module } from '@nestjs/common';
import { VendedoresService } from './vendedores.service';
import { VendedoresController } from './vendedores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendedor } from './entities';

@Module({
  imports:[
    TypeOrmModule.forFeature([Vendedor])
  ],
  providers: [VendedoresService],
  controllers: [VendedoresController]
})
export class VendedoresModule {}
