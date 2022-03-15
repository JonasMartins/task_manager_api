import { EntityRepository, wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import {
    HttpException,
    HttpStatus,
    Injectable,
    Param,
    Request,
} from "@nestjs/common";
import { AuthDto } from "../auth/dto";
import { User } from "./../../entities/User.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>,
    ) {}

    async profile(@Request() req) {
        const user = await this.userRepository.findOne(req.user.userId);
        return user;
    }

    async getById(@Param() id: string) {
        const user = await this.userRepository.findOne(id, {
            populate: ["tasks"],
        });

        if (!user) {
            return new User();
        }
        return user;
    }

    async update(@Param() id: string, dto: AuthDto) {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new HttpException("Email not found.", HttpStatus.NOT_FOUND);
        }

        wrap(user).assign(dto);
        await this.userRepository.persistAndFlush(user);

        return user;
    }

    async delete(@Param() id: string) {
        try {
            const task = await this.userRepository.findOne(id);
            await this.userRepository.removeAndFlush(task);
            return { deleted: true };
        } catch (e) {
            return { error: e.message };
        }
    }
}
