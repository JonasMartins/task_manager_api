import { Module } from "@nestjs/common";
import { OrmModule } from "../orm/orm.module";
import { JwtStrategy } from "./../auth/strategy";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [OrmModule],
    controllers: [UserController],
    providers: [UserService, JwtStrategy],
    exports: [UserService],
})
export class UserModule {}
