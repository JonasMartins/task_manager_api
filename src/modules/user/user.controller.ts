import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    UseGuards,
} from "@nestjs/common";
import { AuthDto } from "../auth/dto";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getProfile(@Param() id: string) {
        return this.userService.getById(id);
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
