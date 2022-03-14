import { Module } from '@nestjs/common';
import { OrmModule } from '../orm/orm.module';

@Module({
    imports: [OrmModule],
})
export class UserModule {}
