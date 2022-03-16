import { MikroORM } from "@mikro-orm/core";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    var corsOptions = {
        origin: process.env.DEV_FRONT_URL,
        credentials: true,
    };

    const app = await NestFactory.create(AppModule, { cors: true });
    await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
    await app.get(MikroORM).getSchemaGenerator().updateSchema();
    await app.get(MikroORM).getMigrator().up();
    //app.enableCors(corsOptions);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    await app.listen(4000);
}
bootstrap();
