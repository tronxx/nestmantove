import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { config } from "dotenv";

import { join } from 'path';
import * as fs from 'fs';
config();

const {
  PRODUCTION,
} = process.env

async function bootstrap() {
  let httpsOptions = {};
  console.log("Production:", PRODUCTION);
  if(PRODUCTION=='true') {
    httpsOptions = {
      key: fs.readFileSync('./secrets/privkey.pem'),
      cert: fs.readFileSync('./secrets/cert.pem'),
    };
  }
 
  const app = await NestFactory.create(AppModule, {
   httpsOptions,
  }
  );
 

//  const app = await NestFactory.create(AppModule);
//  const options = {
//    "origin": "*",
//    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//    "preflightContinue": false,
//    "optionsSuccessStatus": 204,
//    "credentials":true
//  }
  const options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials":true
  }
  
  //app.use(cors(options))
  app.enableCors(options);
  
  const logger = new Logger();
  
  initSwagger(app);

  app.useGlobalPipes (
    new ValidationPipe ({
      whitelist: true,
    }),
  );
  await app.listen(3000);
  logger.log(`Server is running in ${await app.getUrl()} `);
  const misentities = join(__dirname, './**/**/*entity{.ts,.js}');
  logger.log(misentities);

}
bootstrap();
