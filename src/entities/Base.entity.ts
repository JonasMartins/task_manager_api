import { PrimaryKey, Property } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { v4 } from "uuid";

export abstract class BaseEntity {
    @PrimaryKey()
    @ApiProperty({
        type: String,
        example: "27e8196d-a880-40c9-a261-c4ed932eec92",
        description: "ID in uuid format.",
    })
    id: string = v4();

    @Property()
    @ApiProperty({
        type: Date,
        example: "2022-03-17T09:00:00.000Z",
        description: "The moment when the entity has been created.",
    })
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    @ApiProperty({
        type: Date,
        example: "2022-03-17T09:00:00.000Z",
        description: "The moment when the entity has been updated.",
    })
    updatedAt: Date = new Date();
}
