import { Entity, Property } from '@mikro-orm/core';

import { BaseEntity } from './Base.entity';

@Entity()
export class User extends BaseEntity {
    @Property()
    name: string;

    @Property()
    email: string;

    @Property()
    password: string;
}
