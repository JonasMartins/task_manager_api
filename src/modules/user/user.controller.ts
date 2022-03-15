import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Request,
    UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { Request as ExReq } from "express";
import { AuthDto } from "../auth/dto";

@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    getProfile(@Request() req: ExReq) {
        return this.userService.profile(req);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    terminateAccount(@Param() id: string) {
        return this.userService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    update(@Param() id: string, @Body() dto: AuthDto) {
        return this.userService.update(id, dto);
    }
}
