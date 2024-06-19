import { Injectable, Res } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    // service method to sign up a new user
    async signUp(data: Prisma.UserCreateInput) {
        
        // check if the email is already in use
        const user: User = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        // if the email is already in use, throw an error
        if (user) {
            return {
                message: 'Email already in use',
                body: null,
                status: 409
            }
        }
        // create the user
        const newUser: User = await this.prisma.user.create({
            data
        });

        // return the new user
        return {
            message: 'User signed up successfully',
            body: newUser,
            status: 201
        }
    }

    // service to login a user
    async login(data: Prisma.UserCreateInput){
        // check if the email exists
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        // if the email does not exist, throw an error
        if (!user) {
            return {
                message: 'User not found',
                body: null,
                status: 404
            }
        }

        // check if the password is correct
        if (user.password !== data.password) {
            return {
                message: 'Invalid password',
                body: null,
                status: 400
            }
        }

        // return the token
        return {
            message: 'User logged in successfully',
            body: user,
            status: 200
        }
    }

    // service to get all users
    async getAllUsers() {
        // get all users
        const users = await this.prisma.user.findMany();

        // if there are no users, throw an error
        if (users.length === 0 || users === null) {
            return {
                message: 'No users found',
                body: [],
                status: 404
            }
        }

        // return all users
        return {
            message: 'All users',
            body: users,
            status: 200
        }
    }

    // service to get a single user
    async getSingleUser(userId: string) {
        // get the user
        const user = await this.prisma.user.findUnique({
            where: {
                userId: parseInt(userId)
            }
        });

        // if the user does not exist, throw an error
        if (!user) {
            return {
                message: 'User not found',
                body: null,
                status: 404
            }
        }

        // return the user
        return {
            message: 'User found',
            body: user,
            status: 200
        }
    }

    // service to update user profile
    async updateProfile(userId: string, data: Prisma.UserUpdateInput) {
       // check if the user exists
         const user = await this.prisma.user.findUnique({
              where: {
                userId: parseInt(userId)
              }
         });

        // if the user does not exist, throw an error
        if (!user) {
            return {
                message: 'User not found',
                body: null,
                status: 404
            }
        }

        // update the user
        const updatedUser = await this.prisma.user.update({
            where: {
                userId: parseInt(userId)
            },
            data: {
                ...data
            }
        });

        // return the updated user
        return {
            message: 'User updated',
            body: updatedUser,
            status: 200
        }
    }

    // service to delete a user
    async deleteUser(userId: string) {
        // check if the user exists
        const user = await this.prisma.user.findUnique({
            where: {
                userId: parseInt(userId)
            }
        });

        // if the user does not exist, throw an error
        if (!user) {
            return {
                message: 'User not found',
                body: null,
                status: 404
            }
        }

        // delete the user
        await this.prisma.user.delete({
            where: {
                userId: parseInt(userId)
            }
        });

        // return success message
        return {
            message: 'User deleted',
            body: null,
            status: 200
        }
    }
}
