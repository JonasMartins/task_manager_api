import { EntityRepository, wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import {
    HttpException,
    HttpStatus,
    Injectable,
    Param,
    Request,
} from "@nestjs/common";
import { DeletedType, UserResponse } from "src/utils/types";
import { AuthDto } from "../auth/dto";
import { User } from "./../../entities/User.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>,
    ) {}

    async profile(@Request() req): Promise<UserResponse> {
        const user = await this.userRepository.findOne(req.user.userId);
        return { user };
    }

    async getById(@Param() id: string): Promise<UserResponse> {
        const user = await this.userRepository.findOne(id, {
            populate: ["tasks"],
        });

        if (!user) {
            return {
                errors: [{ field: "id", message: "User not Found." }],
            };
        }
        return { user };
    }

    async update(@Param() id: string, dto: AuthDto): Promise<UserResponse> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            return {
                errors: [{ field: "email", message: "Email not found." }],
            };
        }

        wrap(user).assign(dto);
        await this.userRepository.persistAndFlush(user);

        return { user };
    }

    async delete(@Param() id: string): Promise<DeletedType> {
        try {
            const task = await this.userRepository.findOne(id);
            await this.userRepository.removeAndFlush(task);
            return { deleted: true };
        } catch (e) {
            return { error: e.message };
        }
    }
}
