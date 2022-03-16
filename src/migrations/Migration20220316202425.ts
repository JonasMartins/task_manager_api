import { Migration } from '@mikro-orm/migrations';

export class Migration20220316202425 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "task" add column "title" varchar(255) not null, add column "start" timestamptz(0) not null, add column "finish" timestamptz(0) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "task" drop column "title";');
    this.addSql('alter table "task" drop column "start";');
    this.addSql('alter table "task" drop column "finish";');
  }

}
