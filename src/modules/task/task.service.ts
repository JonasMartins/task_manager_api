import { EntityRepository, wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, Param, Request } from "@nestjs/common";
import { DeletedType, TaskResponse, TasksResponse } from "src/utils/types";
import { TaskDto } from "../auth/dto/task.dto";
import { UserService } from "../user/user.service";
import { Task } from "./../../entities/Task.entity";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: EntityRepository<Task>,
        private userService: UserService,
    ) {}

    async myTasks(@Request() req): Promise<TasksResponse> {
        const user = await this.userService.getById(req.user.userId);
        return { tasks: user.user.tasks };
    }

    async findOne(@Param() id: string): Promise<TaskResponse> {
        const task = await this.taskRepository.findOne({ id });
        return { task };
    }

    async create(dto: TaskDto): Promise<TaskResponse> {
        const creator = await this.userService.getById(dto.creator_id);

        if (!creator) {
            return {
                errors: [
                    { field: "creator_id", message: "Creator not found." },
                ],
            };
        }

        const task = this.taskRepository.create({
            badge: dto.badge,
            done: dto.done,
            description: dto.description,
            priority: dto.priority,
            creator: creator.user,
        });

        await this.taskRepository.persist(task).flush();

        return { task };
    }

    async update(@Param() id: string, dto: TaskDto): Promise<TaskResponse> {
        const task = await this.taskRepository.findOne(id);

        if (!task) {
            return {
                errors: [{ field: "email", message: "Email not found." }],
            };
        }

        wrap(task).assign(dto);
        await this.taskRepository.persistAndFlush(task);

        return { task };
    }

    async delete(@Param() id: string): Promise<DeletedType> {
        try {
            const task = await this.taskRepository.findOne(id);
            await this.taskRepository.removeAndFlush(task);
            return { deleted: true };
        } catch (e) {
            return { error: e.message };
        }
    }
}
