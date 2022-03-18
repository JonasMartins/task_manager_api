import { MikroORM } from "@mikro-orm/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
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

    const config = new DocumentBuilder()
        .setTitle("Task Manager Api")
        .setDescription("Task Manager api using nestjs.")
        .setVersion("1.0")
        .addTag("tasks")
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    await app.listen(4000);
}
bootstrap();
