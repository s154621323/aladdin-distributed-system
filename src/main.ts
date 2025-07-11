import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 添加全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 剔除未定义的属性
      transform: true, // 自动类型转换
      forbidNonWhitelisted: true, // 拒绝未定义的属性
    }),
  );

  // 添加API前缀
  app.setGlobalPrefix('api');

  // 配置Swagger文档
  const config = new DocumentBuilder()
    .setTitle('Aladdin API')
    .setDescription('分布式任务处理系统API文档')
    .setVersion('1.0')
    .addTag('agents', '代理管理')
    .addTag('jobs', '任务管理')
    .addBearerAuth() // 添加Bearer认证
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  // 配置CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);

  const serverUrl = await app.getUrl();
  console.log(`服务已启动，API文档地址: ${serverUrl}/docs`);
}
bootstrap();
