import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskPriority, TaskBadge } from "./../../../enums/types.enum";
import { ApiProperty } from "@nestjs/swagger";

export class TaskDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "The task title.",
    })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
    })
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description:
            "The valid id of a user, this api uses uuid format for ID field.",
    })
    creator_id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "2022-03-17T08:00:00.000Z",
        description:
            "The date and time for the task to begin, must be less than finish",
    })
    start: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: "2022-03-17T09:00:00.000Z",
        description:
            "The date and time for the task to finish, must be grater than start",
    })
    finish: string;

    @IsEnum(TaskPriority)
    @IsNotEmpty()
    @ApiProperty({
        enum: TaskPriority,
        example: "LOW, MEDIUM, HIGH, URGENT",
        description: "The priority of your task.",
    })
    priority: TaskPriority;

    @IsEnum(TaskBadge)
    @IsOptional()
    @ApiProperty({
        enum: TaskPriority,
        example: "RED, ORANGE, YELLOW, GREEN, BLUE",
        description:
            "A badge which uses a color to better filter later your task.",
    })
    badge?: TaskBadge;

    @IsOptional()
    @ApiProperty({
        example: "false",
        description:
            "A flag indicating if your task has already been performed.",
    })
    done?: boolean;
}
