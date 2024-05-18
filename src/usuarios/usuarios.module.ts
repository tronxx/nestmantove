import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'

import { config } from "dotenv";
config();

const {
  JWT_SECRET
} = process.env


@Module({
  imports:[
    TypeOrmModule.forFeature([Usuarios]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {expiresIn: '24h'}

    })
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, JwtStrategy]
})
export class UsuariosModule {}
