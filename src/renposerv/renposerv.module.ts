import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RenposervController } from './renposerv.controller';
import { RenposervService } from './renposerv.service';
import { Renposerv } from './entities';
import { Poliserv } from 'src/poliserv/entities';

@Module({
    imports:[
      TypeOrmModule.forFeature([Renposerv, Poliserv])
    ],
    controllers: [RenposervController],
    providers: [RenposervService]
  })
  export class RenposervModule {}
  