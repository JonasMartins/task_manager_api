import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, UseGuards, Request } from "@nestjs/common";
import { User } from "src/entities/User.entity";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>,
    ) {}

    @UseGuards(JwtAuthGuard)
    async profile(@Request() req) {
        const user = await this.userRepository.findOne(req.user.userId);
        return user;
    }
}
