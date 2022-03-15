import { Migration } from '@mikro-orm/migrations';

export class Migration20220315204810 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "task" drop constraint "task_creator_id_foreign";');

    this.addSql('alter table "task" add constraint "task_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update set null on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "task" drop constraint "task_creator_id_foreign";');

    this.addSql('alter table "task" add constraint "task_creator_id_foreign" foreign key ("creator_id") references "user" ("id") on update cascade;');
  }

}
