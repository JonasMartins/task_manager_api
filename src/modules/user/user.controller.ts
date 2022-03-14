import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private authService: UserService) {}

    @Get('hello')
    register() {
        return this.authService.hello();
    }
}
