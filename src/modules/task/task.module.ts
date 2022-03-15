import { Module } from "@nestjs/common";
import { JwtStrategy } from "../auth/strategy";
import { OrmModule } from "../orm/orm.module";
import { UserService } from "../user/user.service";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

@Module({
    imports: [OrmModule],
    controllers: [TaskController],
    providers: [TaskService, UserService, JwtStrategy],
    exports: [TaskService],
})
export class TaskModule {}
