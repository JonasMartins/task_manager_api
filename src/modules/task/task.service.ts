import { EntityRepository, wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, Param, Request } from "@nestjs/common";
import { convertStringToDate } from "src/utils/time";
import {
    DeletedType,
    errorResponse,
    TaskResponse,
    TasksResponse,
} from "src/utils/types";
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

    async myTasks(@Param() id: string): Promise<TasksResponse> {
        const user = await this.userService.getById(id);
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

        const start = convertStringToDate(dto.start);
        const finish = convertStringToDate(dto.finish);

        if (!start || !finish) {
            let errors: errorResponse[] = [];
            if (!start) {
                errors.push({
                    field: "start",
                    message: "Error formatting start date",
                });
            }

            if (!finish) {
                errors.push({
                    field: "finish",
                    message: "Error formatting finish date",
                });
            }

            return {
                errors,
            };
        } else {
            if (start >= finish) {
                return {
                    errors: [
                        {
                            field: "finish",
                            message: "Finish field must be greater than start",
                        },
                    ],
                };
            }
        }

        const task = this.taskRepository.create({
            title: dto.title,
            badge: dto.badge,
            done: dto.done,
            description: dto.description,
            priority: dto.priority,
            start: start,
            finish: finish,
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

        const start = convertStringToDate(dto.start);
        const finish = convertStringToDate(dto.finish);

        if (!start || !finish) {
            let errors: errorResponse[] = [];
            if (!start) {
                errors.push({
                    field: "start",
                    message: "Error formatting start date",
                });
            }

            if (!finish) {
                errors.push({
                    field: "finish",
                    message: "Error formatting finish date",
                });
            }

            return {
                errors,
            };
        } else {
            if (start >= finish) {
                return {
                    errors: [
                        {
                            field: "finish",
                            message: "Finish field must be greater than start",
                        },
                    ],
                };
            }
        }

        let updatedTask = new Task();
        updatedTask.id = task.id;
        updatedTask.badge = dto.badge;
        updatedTask.done = dto.done;
        updatedTask.createdAt = task.createdAt;
        updatedTask.creator = task.creator;
        updatedTask.title = dto.title;
        updatedTask.description = dto.description;
        updatedTask.priority = dto.priority;
        updatedTask.updatedAt = task.updatedAt;
        updatedTask.start = start;
        updatedTask.finish = finish;

        wrap(task).assign(updatedTask);
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
