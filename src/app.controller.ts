import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { join } from 'path';

@ApiTags('Mantove')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
    const misentities = join(__dirname, './**/**/*entity{.ts,.js}');
    console.log(misentities);
  }
}
