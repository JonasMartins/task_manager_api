import { Migration } from '@mikro-orm/migrations';

export class Migration20220314193238 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "user" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null);',
        );
        this.addSql(
            'alter table "user" add constraint "user_pkey" primary key ("id");',
        );
    }
}
