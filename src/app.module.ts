import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { TaskModule } from "./modules/task/task.module";
import { MikroOrmModule } from "@mikro-orm/nestjs";

@Module({
    imports: [MikroOrmModule.forRoot(), AuthModule, UserModule, TaskModule],
})
export class AppModule {}
