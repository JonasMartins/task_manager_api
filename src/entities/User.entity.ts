import {
    Entity,
    Property,
    Unique,
    OneToMany,
    Cascade,
    Collection,
} from "@mikro-orm/core";
import { BaseEntity } from "./Base.entity";
import { Task } from "./Task.entity";

@Entity()
export class User extends BaseEntity {
    @Property()
    name: string;

    @Property()
    @Unique()
    email: string;

    @Property({ hidden: true })
    password: string;

    @Property({ nullable: true })
    picture: string;

    @OneToMany(() => Task, (t) => t.creator, { cascade: [Cascade.ALL] })
    tasks = new Collection<Task>(this);
}
