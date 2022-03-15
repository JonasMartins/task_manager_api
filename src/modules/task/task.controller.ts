import {
    Controller,
    Get,
    UseGuards,
    Request,
    Post,
    Body,
    Param,
    Delete,
    Put,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { TaskService } from "./task.service";
import { Request as ExReq } from "express";
import { TaskDto } from "../auth/dto/task.dto";

@Controller("tasks")
export class TaskController {
    constructor(protected taskService: TaskService) {}

    @UseGuards(JwtAuthGuard)
    @Get("/")
    getMyTasks(@Request() req: ExReq) {
        return this.taskService.myTasks(req);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    findOne(@Request() req) {
        return this.taskService.findOne(req.user.userId);
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
