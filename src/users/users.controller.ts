import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import * as userDto from './dto';
import { parse } from 'path';

@Controller('users')
export class UsersController {

    // inject the UsersService into the UsersController
    constructor(private usersService: UsersService) { }

    // endpoint to sign up a user
    @Post('auth/signup')
    async signUp(@Body() signUpDto: userDto.SignUpDto) {
        return this.usersService.signUp(signUpDto);
    }

    // endpoint to get order history of a user [BONUS]
    @Get(':userId/orders')
    async getOrderHistory(@Param('userId') userId: string) {
        return this.usersService.getOrderHistory(parseInt(userId));
    }

}
