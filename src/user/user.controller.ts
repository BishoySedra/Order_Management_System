import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDTO, SignUpDTO } from './dto';

@Controller('users')
export class UserController {

    // inject the user service
    constructor(private userService: UserService) {}

    // route for signing up a new user
    @Post('signup')
    async signUp(@Body() data: SignUpDTO) {
        return this.userService.signUp(data);
    }

    // route for signing in a user
    @Post('login')
    async signIn(@Body() data: SignInDTO) {
        return this.userService.signIn(data);
    }

}
