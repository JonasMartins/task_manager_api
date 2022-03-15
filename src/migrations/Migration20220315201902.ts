import { Migration } from '@mikro-orm/migrations';

export class Migration20220315201902 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "picture" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "picture";');
  }

}
