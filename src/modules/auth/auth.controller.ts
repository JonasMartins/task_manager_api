import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { LoginDto } from "./dto/login.dto";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { LoginResponse } from "src/utils/types";

@ApiBearerAuth()
@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("register")
    @ApiOperation({ summary: "Create a user" })
    @ApiResponse({
        status: 201,
        description: "Register a new",
        type: LoginResponse,
    })
    register(@Body() dto: AuthDto) {
        return this.authService.register(dto);
    }

    @Post("login")
    @ApiOperation({ summary: "Login a user" })
    @ApiResponse({
        status: 200,
        description: "Login a user",
        type: LoginResponse,
    })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}
