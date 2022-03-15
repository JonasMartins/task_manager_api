import { Entity, Property, Unique } from "@mikro-orm/core";
import { BaseEntity } from "./Base.entity";

@Entity()
export class User extends BaseEntity {
    @Property()
    name: string;

    @Property()
    @Unique()
    email: string;

    @Property({ hidden: true })
    password: string;
}
