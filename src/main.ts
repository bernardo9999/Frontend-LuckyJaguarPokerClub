import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// const path = require("path");
// const fs = require("fs");
// const os = require("os");
// const homedir = os.homedir();
require("dotenv").config({ path: __dirname + "/.env" });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('');
  const options = new DocumentBuilder().setTitle('EqualsSport API').setDescription('EqualsSport API').setVersion('1.0.0').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
