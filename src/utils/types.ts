import { Collection, Property } from "@mikro-orm/core";
import { TaskBadge, TaskPriority } from "src/enums/types.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Task as TaskEntity } from "./../entities/Task.entity";
import { User as UserEntity } from "./../entities/User.entity";

export type Maybe<T> = T | null;
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: any;
    Upload: any;
};

export type hashedPasswordType = {
    salt: string;
    hash: string;
};

export class errorResponse {
    field: string;
    message: string;
}

export type User = {
    __typename?: "User";
    id: Scalars["ID"];
    name: string;
    email: string;
    password: string;
    picture: Maybe<string>;
    createdAt: Scalars["DateTime"];
    updatedAt: Scalars["DateTime"];
    tasks: Collection<Task, unknown>;
};

export type Task = {
    __typename?: "Task";
    id: Scalars["ID"];
    title: string;
    description: string;
    priority: TaskPriority;
    badge: Maybe<TaskBadge>;
    done: boolean;
    creator: User;
    start: Scalars["DateTime"];
    finish: Scalars["DateTime"];
    createdAt: Scalars["DateTime"];
    updatedAt: Scalars["DateTime"];
};

export type DeletedType = {
    deleted?: Maybe<boolean>;
    error?: Maybe<any>;
};

export class DeletedClassType {
    @Property({ nullable: true })
    @ApiProperty({
        type: Boolean,
        description: "True if the object has been deleted",
    })
    deleted?: boolean;

    @Property({ nullable: true })
    @ApiProperty({
        type: [errorResponse],
    })
    error?: errorResponse[];
}

export class TaskResponse {
    @Property({ nullable: true })
    @ApiProperty({
        type: [errorResponse],
    })
    errors?: errorResponse[];

    @Property({ nullable: true })
    @ApiProperty({
        type: TaskEntity,
    })
    task?: Task;
}

export class TasksResponse {
    @Property({ nullable: true })
    @ApiProperty({
        type: [errorResponse],
    })
    errors?: errorResponse[];

    @Property({ nullable: true })
    @ApiProperty({
        type: [TaskEntity],
    })
    tasks?: Collection<Task, unknown>;
}

export class UserResponse {
    @Property({ nullable: true })
    @ApiProperty({
        type: [errorResponse],
    })
    errors?: errorResponse[];

    @Property({ nullable: true })
    @ApiProperty({
        type: UserEntity,
    })
    user?: User;
}

export class LoginResponse {
    @Property({ nullable: true })
    @ApiProperty({
        type: String,
    })
    access_token?: string;

    @Property({ nullable: true })
    @ApiProperty({
        type: [errorResponse],
    })
    errors?: errorResponse[];
}
