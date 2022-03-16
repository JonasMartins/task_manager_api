import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { HttpException, HttpStatus, Injectable, Res } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Response } from "express";
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

        return this.signToken(user.id, user.email);
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
        return this.signToken(prevUser.id, prevUser.email);
    }

    async signToken(
        id: string,
        email: string,
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: id,
            email,
        };

        return { access_token: this.jwt.sign(payload) };
    }
}
