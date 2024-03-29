import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
    //"preflightContinue": false,
    //"optionsSuccessStatus": 204,
    //"credentials":true
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
