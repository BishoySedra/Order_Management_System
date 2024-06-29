import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import * as userDto from './dto';

@Controller('users')
export class UsersController {

    // inject the UsersService into the UsersController
    constructor(private usersService: UsersService) { }

    // endpoint to sign up a user
    @Post('auth/signup')
    async signUp(@Body() signUpDto: userDto.SignUpDto) {
        return this.usersService.signUp(signUpDto);
    }

}
