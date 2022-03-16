import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginResponse } from "src/utils/types";
import { User } from "./../../entities/User.entity";
import { AuthDto } from "./dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>,
        private jwt: JwtService,
    ) {}

    async register(dto: AuthDto): Promise<LoginResponse> {
        const prevUser = await this.userRepository.findOne({
            email: dto.email,
        });

        if (prevUser) {
            return {
                errors: [{ field: "email", message: "Email already takken" }],
            };
        }

        const hashPass = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({
            email: dto.email,
            password: hashPass,
            name: dto.name,
        });

        await this.userRepository.persist(user).flush();

        const token = await this.signToken(
            user.id,
            user.name,
            user.email,
            user.picture || "",
        );

        return token;
    }

    async login(dto: LoginDto): Promise<LoginResponse> {
        const prevUser = await this.userRepository.findOne({
            email: dto.email,
        });

        if (!prevUser) {
            return {
                errors: [{ field: "email", message: "Email not Found." }],
            };
        }
        const pass = await bcrypt.compare(dto.password, prevUser.password);
        if (!pass) {
            return {
                errors: [{ field: "password", message: "Wrong Password." }],
            };
        }

        const token = await this.signToken(
            prevUser.id,
            prevUser.name,
            prevUser.email,
            prevUser.picture || "",
        );

        return token;
    }

    async signToken(
        id: string,
        name: string,
        email: string,
        picture: string,
    ): Promise<{ access_token: string }> {
        const payload = {
            id,
            name,
            email,
            picture,
        };

        return { access_token: this.jwt.sign(payload) };
    }
}
