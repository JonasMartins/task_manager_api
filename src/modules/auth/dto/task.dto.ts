import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskPriority, TaskBadge } from "./../../../enums/types.enum";

export class TaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    creator_id: string;

    @IsString()
    @IsNotEmpty()
    start: string;

    @IsString()
    @IsNotEmpty()
    finish: string;

    @IsEnum(TaskPriority)
    @IsNotEmpty()
    priority: TaskPriority;

    @IsEnum(TaskBadge)
    @IsOptional()
    badge?: TaskBadge;

    @IsOptional()
    done?: boolean;
}
