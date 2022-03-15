import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { OrmModule } from "../orm/orm.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        OrmModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || "super-secret",
            signOptions: { expiresIn: "1d" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
