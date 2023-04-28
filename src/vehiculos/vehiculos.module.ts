import { Module } from '@nestjs/common';
import { VehiculosController } from './vehiculos.controller';

@Module({
  controllers: [VehiculosController]
})
export class VehiculosModule {}
