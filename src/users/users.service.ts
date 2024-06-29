import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as hashingOperations from '../utils/argon2';
import * as userDto from './dto';

@Injectable()
export class UsersService {

    // inject the PrismaClient into the UsersService
    constructor(private prisma: PrismaService) { }

    // service method to sign up a user
    async signUp(signUpDto: userDto.SignUpDto) {
        try {

            // check if the email is already in use
            const foundUser = await this.prisma.user.findUnique({
                where: {
                    email: signUpDto.email
                }
            });

            // if the email is already in use, return an error message
            if (foundUser) {
                return {
                    message: 'Email is already in use',
                    body: null,
                    status: 400
                }
            }

            // hash the password
            const hashedPassword = await hashingOperations.hashPassword(signUpDto.password);

            // create the user
            const newUser = await this.prisma.user.create({
                data: {
                    name: signUpDto.name,
                    email: signUpDto.email,
                    password: hashedPassword
                }
            });

            // return the user
            return {
                message: 'User created successfully',
                body: newUser,
                status: 201
            }

        } catch (error) {
            return {
                message: error.message,
                body: null,
                status: 500
            }
        }
    }
}
