import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";
import { TaskDto } from "../auth/dto/task.dto";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { TaskService } from "./task.service";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { Task } from "./../../entities/Task.entity";
import { TaskResponse, DeletedClassType } from "./../../utils/types";

@ApiBearerAuth()
@ApiTags("tasks")
@Controller("tasks")
export class TaskController {
    constructor(protected taskService: TaskService) {}

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    @ApiResponse({
        status: 200,
        description: "The found record",
        type: Task,
    })
    findOne(@Param() id: string) {
        return this.taskService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("create")
    @ApiOperation({ summary: "Create a Task" })
    @ApiResponse({
        status: 201,
        description: "The task created",
        type: TaskResponse,
    })
    create(@Body() dto: TaskDto) {
        return this.taskService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    @ApiOperation({ summary: "Delete Task" })
    @ApiResponse({
        status: 201,
        description: "The deletion result.",
        type: DeletedClassType,
    })
    delete(@Param() id: string) {
        return this.taskService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    @ApiOperation({ summary: "Update a Task" })
    @ApiResponse({
        status: 201,
        description: "The task updated",
        type: TaskResponse,
    })
    update(@Param() id: string, @Body() dto: TaskDto) {
        return this.taskService.update(id, dto);
    }
}
