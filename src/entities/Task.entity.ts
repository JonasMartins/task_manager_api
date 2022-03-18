import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { TaskPriority, TaskBadge } from "./../enums/types.enum";
import { BaseEntity } from "./Base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./User.entity";

@Entity()
export class Task extends BaseEntity {
    @ApiProperty({
        type: String,
        example: "Study Nodejs",
        description: "A task to be performed on a given date",
    })
    @Property()
    title!: string;

    @ApiProperty({
        type: String,
        example: "My task description",
        description: "A description of your task",
    })
    @Property()
    description!: string;

    @ApiProperty({
        type: Date,
        example: "03/18/2022:08:00",
        description: "The date and hour that your task is supposed to happen.",
    })
    @Property()
    start: Date;

    @ApiProperty({
        type: Date,
        example: "03/18/2022:09:00",
        description: "The date and hour that your task is supposed to happen.",
    })
    @Property()
    finish: Date;

    @ApiProperty({
        type: Boolean,
        example: "false",
        description:
            "A flag indicating if your task has already been performed.",
    })
    @Property({ default: false })
    done: boolean;

    @ManyToOne(() => User, {
        onUpdateIntegrity: "set null",
        onDelete: "cascade",
    })
    @ApiProperty({
        type: () => User,
    })
    creator!: User;

    @Enum(() => TaskPriority)
    @ApiProperty({
        enum: TaskPriority,
        example: "LOW, MEDIUM, HIGH, URGENT",
        description: "The priority of your task.",
    })
    priority!: TaskPriority;

    @Property({ nullable: true })
    @Enum(() => TaskBadge)
    @ApiProperty({
        enum: TaskBadge,
        example: "RED, ORANGE, YELLOW, GREEN, BLUE",
        description:
            "A badge which uses a color to better filter later your task.",
    })
    badge: TaskBadge;
}
