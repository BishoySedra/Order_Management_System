import { Controller, Body, Res, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    async response(res: Response, data: any) {
        return res.status(data.status).json(data);
    }

    // controller method to sign up a new user
    @Post('signup')
    async signUp(@Body() data: Prisma.UserCreateInput, @Res() res: Response, ) {
        return this.response(res, await this.usersService.signUp(data));
    }

    // controller method to login a user
    @Post('login')
    async login(@Body() data: Prisma.UserCreateInput, @Res() res: Response){
        return this.response(res, await this.usersService.login(data));
    }

    // controller method to get all users
    @Get()
    async getAllUsers(@Res() res: Response) {
        return this.response(res, await this.usersService.getAllUsers());
    }

    // controller method to get a user by id
    @Get(':id')
    async getUserById(@Param('id') id: string, @Res() res: Response) {
        return this.response(res, await this.usersService.getSingleUser(id));
    }

    // controller method to update a user by id
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() data: Prisma.UserCreateInput, @Res() res: Response) {
        return this.response(res, await this.usersService.updateProfile(id, data));
    }

    // controller method to delete a user by id
    @Delete(':id')
    async deleteUser(@Param('id') id: string, @Res() res: Response) {
        return this.response(res, await this.usersService.deleteUser(id));
    }
}
