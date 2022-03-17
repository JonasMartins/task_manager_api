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

@Controller("tasks")
export class TaskController {
    constructor(protected taskService: TaskService) {}

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    findOne(@Param() id: string) {
        return this.taskService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("create")
    create(@Body() dto: TaskDto) {
        return this.taskService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    delete(@Param() id: string) {
        return this.taskService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    update(@Param() id: string, @Body() dto: TaskDto) {
        return this.taskService.update(id, dto);
    }
}
