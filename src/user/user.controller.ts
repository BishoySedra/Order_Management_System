import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDTO, SignUpDTO } from './dto';

@Controller('users')
export class UserController {

    // inject the user service
    constructor(private userService: UserService) { }

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

    // route to get all users
    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    // route to get a user by id
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.userService.getUserById(parseInt(id));
    }

    // route to update a user
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() data: SignUpDTO) {
        return this.userService.updateUser(parseInt(id), data);
    }

    // route to delete a user
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(parseInt(id));
    }

}
