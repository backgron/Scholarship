import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //设置cookieSession
  app.use(cookieSession({
    keys: ['back'],
    maxAge: 3 * 60 * 60 * 1000
  }))

  // 全局设置类型验证管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  app.enableCors()

  //配置 swagger
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
