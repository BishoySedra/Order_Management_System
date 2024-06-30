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

    // service method to get order history of a user [BONUS]
    async getOrderHistory(userId: number) {
        try {

            // check if the user exists
            const user = await this.prisma.user.findUnique({
                where: {
                    userId
                }
            });

            // if the user does not exist, return an error message
            if (!user) {
                return {
                    message: 'User not found',
                    body: null,
                    status: 404
                }
            }

            // get the order history of the user
            const orderHistory = await this.prisma.order.findMany({
                where: {
                    userId
                }, select: {
                    orderId: true,
                    orderDate: true,
                    total: true,
                    products: {
                        select: {
                            quantity: true,
                            product: {
                                select: {
                                    name: true,
                                    price: true
                                }
                            }
                        }
                    }
                }
            });

            // return the order history
            return {
                message: 'Order history retrieved successfully',
                body: orderHistory,
                status: 200
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
