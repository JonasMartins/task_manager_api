import { Module } from '@nestjs/common';
import { OrmModule } from '../orm/orm.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [OrmModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
