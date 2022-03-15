import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "./../../entities/User.entity";
import { Task } from "./../../entities/Task.entity";
@Module({
    imports: [
        MikroOrmModule.forRoot(),
        MikroOrmModule.forFeature({
            entities: [User, Task],
        }),
    ],
    exports: [MikroOrmModule],
})
export class OrmModule {}
