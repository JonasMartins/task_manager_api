import { EntityRepository, wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import {
    HttpException,
    HttpStatus,
    Injectable,
    Param,
    Request,
} from "@nestjs/common";
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

    async myTasks(@Request() req) {
        const user = await this.userService.getById(req.user.userId);
        return user.tasks;
    }

    async findOne(@Param() id: string) {
        const task = await this.taskRepository.findOne({ id });
        return task;
    }

    async create(dto: TaskDto): Promise<Task> {
        const creator = await this.userService.getById(dto.creator_id);

        if (!creator) {
            throw new HttpException("Creator not found", HttpStatus.NOT_FOUND);
        }

        const task = this.taskRepository.create({
            badge: dto.badge,
            done: dto.done,
            description: dto.description,
            priority: dto.priority,
            creator,
        });

        await this.taskRepository.persist(task).flush();

        return task;
    }

    async update(@Param() id: string, dto: TaskDto) {
        const task = await this.taskRepository.findOne(id);

        if (!task) {
            throw new HttpException("Email not found.", HttpStatus.NOT_FOUND);
        }

        wrap(task).assign(dto);
        await this.taskRepository.persistAndFlush(task);

        return task;
    }

    async delete(@Param() id: string) {
        try {
            const task = await this.taskRepository.findOne(id);
            await this.taskRepository.removeAndFlush(task);
            return { deleted: true };
        } catch (e) {
            return { error: e.message };
        }
    }
}
