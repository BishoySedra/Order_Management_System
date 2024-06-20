import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDTO, SignInDTO } from './dto';
import { User } from '@prisma/client';
import { customError } from 'src/errors/error';
import { errorHandler } from 'src/errors/errorHandler';
import * as argonOperations from 'src/utils/argon';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    // service method to sign up a new user
    async signUp(data: SignUpDTO) {

        try {
            
            // check if the email already exists
            const userExists = await this.prisma.user.findUnique({ where: { email: data.email } });

            // if the email already exists, return an error
            if (userExists) {
                
                throw new customError('Email already exists', 400);
            }

            // hash the password
            data.password = await argonOperations.hashPassword(data.password);

            // create a new user
            const user: User = await this.prisma.user.create({ data });

            // remove the password from the user object
            delete user.password;

            // return the new user
            return {
                message: 'User created successfully',
                body: user,
                status: 201
            }

        } catch (error) {

            // handle the error
            return errorHandler(error);
            
        }

    }

    // service method to sign in a user
    async signIn(data: SignInDTO) {
        try {

            // check if the email exists
            const user = await this.prisma.user.findUnique({ where: { email: data.email } });

            // if the email does not exist, return an error
            if (!user) {
                throw new customError('Invalid credentials', 400);
            }

            // verify the password
            const passwordMatch = await argonOperations.verifyPassword(user.password, data.password);

            // if the password does not match, return an error
            if (!passwordMatch) {
                throw new customError('Invalid credentials', 400);
            }

            // generate a jwt token
            const token = await this.jwt.signAsync({id: user.userId, email: user.email}, {
                secret: process.env.JWT_SECRET,
                expiresIn: '1d'
            });

            // remove the password from the user object
            delete user.password;

            // return the user
            return {
                message: 'User signed in successfully',
                body: {
                    token
                },
                status: 200
            }
            
        } catch (error) {
           
            // handle the error
            return errorHandler(error);
            
        }

    }

}
