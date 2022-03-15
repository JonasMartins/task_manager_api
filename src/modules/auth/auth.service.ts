import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "src/entities/User.entity";
import { AuthDto } from "./dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>,
        private jwt: JwtService,
    ) {}

    async register(dto: AuthDto): Promise<{ access_token: string }> {
        const prevUser = await this.userRepository.findOne({
            email: dto.email,
        });

        if (prevUser) {
            throw new HttpException(
                "Email already takken",
                HttpStatus.UNAUTHORIZED,
            );
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

    async login(dto: LoginDto): Promise<{ access_token: string }> {
        const prevUser = await this.userRepository.findOne({
            email: dto.email,
        });

        if (!prevUser) {
            throw new HttpException("Email not found.", HttpStatus.NOT_FOUND);
        }
        const pass = bcrypt.compare(dto.password, prevUser.password);
        if (!pass) {
            throw new HttpException("Wrong Password.", HttpStatus.UNAUTHORIZED);
        }
        return this.signToken(prevUser.id, prevUser.email);
    }

    logout() {
        return { msg: "test" };
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
