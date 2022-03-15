import { Migration } from '@mikro-orm/migrations';

export class Migration20220315162907 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "task" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "description" varchar(255) not null, "done" boolean not null default false, "creator_id" varchar(255) not null, "priority" text check ("priority" in (\'LOW\', \'MEDIUM\', \'HIGH\', \'URGENT\')) not null, "badge" jsonb null);');
    this.addSql('alter table "task" add constraint "task_pkey" primary key ("id");');

    this.addSql('alter table "task" add constraint "task_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "task" cascade;');
  }

}
