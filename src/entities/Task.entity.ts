import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { TaskPriority, TaskBadge } from "./../enums/types.enum";
import { BaseEntity } from "./Base.entity";
import { User } from "./User.entity";

@Entity()
export class Task extends BaseEntity {
    @Property()
    title!: string;

    @Property()
    description!: string;

    @Property()
    start: Date;

    @Property()
    finish: Date;

    @Property({ default: false })
    done: boolean;

    @ManyToOne(() => User, {
        onUpdateIntegrity: "set null",
        onDelete: "cascade",
    })
    creator!: User;

    @Enum(() => TaskPriority)
    priority!: TaskPriority;

    @Property({ nullable: true })
    @Enum(() => TaskBadge)
    badge: TaskBadge;
}
