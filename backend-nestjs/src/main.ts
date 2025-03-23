import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add validation input
  app.useGlobalPipes(new ValidationPipe());

  // config swagger UI
  const configSwagger = new DocumentBuilder()
    .setTitle('API youtube mini')
    .setDescription("Danh sách API youtube mini")
    .setVersion("1.0")
    .addBearerAuth()
    .build(); // builder pattern
  
    // apply config to swagger
  const swagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup("swagger", app, swagger);

  await app.listen(3000);
}
bootstrap();

