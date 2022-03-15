import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskPriority, TaskBadge } from "./../../../enums/types.enum";

export class TaskDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    creator_id: string;

    @IsEnum(TaskPriority)
    @IsNotEmpty()
    priority: TaskPriority;

    @IsEnum(TaskBadge)
    @IsOptional()
    badge?: TaskBadge;

    @IsOptional()
    done?: boolean;
}
