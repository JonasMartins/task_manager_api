import { Collection, Property } from "@mikro-orm/core";
import { TaskBadge, TaskPriority } from "src/enums/types.enum";

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

export type errorResponse = {
    field: string;
    message: string;
};

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

export class TaskResponse {
    @Property({ nullable: true })
    errors?: errorResponse[];

    @Property({ nullable: true })
    task?: Task;
}

export class TasksResponse {
    @Property({ nullable: true })
    errors?: errorResponse[];

    @Property({ nullable: true })
    tasks?: Collection<Task, unknown>;
}

export class UserResponse {
    @Property({ nullable: true })
    errors?: errorResponse[];

    @Property({ nullable: true })
    user?: User;
}

export class LoginResponse {
    @Property({ nullable: true })
    access_token?: string;

    @Property({ nullable: true })
    errors?: errorResponse[];
}
