import { MikroORM } from '@mikro-orm/core';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
    await app.get(MikroORM).getSchemaGenerator().updateSchema();
    await app.get(MikroORM).getMigrator().up();

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    await app.listen(4000);
}
bootstrap();
