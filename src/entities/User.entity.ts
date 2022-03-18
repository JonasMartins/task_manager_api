import {
    Entity,
    Property,
    Unique,
    OneToMany,
    Cascade,
    Collection,
} from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "./Base.entity";
import { Task } from "./Task.entity";

@Entity()
export class User extends BaseEntity {
    @Property()
    @ApiProperty({
        type: String,
    })
    name: string;

    @Property()
    @Unique()
    @ApiProperty({
        type: String,
        example: "email@email.com",
        description: "A unique email.",
    })
    email: string;

    @Property({ hidden: true })
    @ApiProperty({
        type: String,
        example: "my_password",
    })
    password: string;

    @Property({ nullable: true })
    @ApiProperty({
        type: String,
        description: "A url where the file is hosted",
    })
    picture: string;

    @OneToMany(() => Task, (t) => t.creator, { cascade: [Cascade.ALL] })
    @ApiProperty({
        type: () => [Task],
    })
    tasks = new Collection<Task>(this);
}
