import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { Request as ExReq } from "express";

@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    getProfile(@Request() req: ExReq) {
        return this.userService.profile(req);
    }
}
