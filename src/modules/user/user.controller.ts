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
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { User } from "src/entities/User.entity";
import { DeletedClassType } from "src/utils/types";

@ApiBearerAuth()
@ApiTags("users")
@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    @ApiOperation({ summary: "Get a User" })
    @ApiResponse({
        status: 200,
        type: User,
    })
    getProfile(@Param() id: string) {
        return this.userService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    @ApiOperation({ summary: "Delete a User" })
    @ApiResponse({
        status: 200,
        type: DeletedClassType,
    })
    terminateAccount(@Param() id: string) {
        return this.userService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    @ApiOperation({ summary: "Update a User" })
    @ApiResponse({
        status: 202,
        type: User,
    })
    update(@Param() id: string, @Body() dto: AuthDto) {
        return this.userService.update(id, dto);
    }
}
