import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, Param, Request } from "@nestjs/common";
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
}
