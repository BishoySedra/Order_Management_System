import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
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

    // endpoint to sign in a user
    @Post('auth/login')
    async signIn(@Body() signInDto: userDto.SignInDto) {
        return this.usersService.login(signInDto);
    }

    // endpoint to get order history of a user [BONUS]
    @Get(':userId/orders')
    async getOrderHistory(@Param('userId') userId: string) {
        return this.usersService.getOrderHistory(parseInt(userId));
    }

    // endpoint to get all users
    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    // endpoint to get a user by id
    @Get(':userId')
    async getUserById(@Param('userId') userId: string) {
        return this.usersService.getUserById(parseInt(userId));
    }

    // endpoint to update user profile
    @Put(':userId')
    async updateUserProfile(@Param('userId') userId: string, @Body() body: userDto.UpdateUserDto) {
        return this.usersService.updateUserProfile(parseInt(userId), body);
    }

    // endpoint to delete a user
    @Delete(':userId')
    async deleteUser(@Param('userId') userId: string) {
        return this.usersService.deleteUser(parseInt(userId));
    }

}
