import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as hashingOperations from '../utils/argon2';
import * as userDto from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    // inject the PrismaClient into the UsersService
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    // service method to sign up a user
    async signUp(signUpDto: userDto.SignUpDto) {
        try {

            // destruct the name, email and password from the signUpDto
            const { name, email, password } = signUpDto;

            // check if the email is already in use
            const foundUser = await this.prisma.user.findUnique({
                where: {
                    email
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
            const hashedPassword = await hashingOperations.hashPassword(password);

            // create the user
            const newUser = await this.prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            });

            // delete the password from the user object
            delete newUser.password;

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

    // service method to sign in a user
    async login(signInDto: userDto.SignInDto) {
        try {

            // destruct the email and password from the signInDto
            const { email, password } = signInDto;

            // check if the user exists
            const user = await this.prisma.user.findUnique({
                where: {
                    email
                }
            });

            // if the user does not exist, return an error message
            if (!user) {
                return {
                    message: 'Invalid email or password',
                    body: null,
                    status: 400
                }
            }

            // verify the password
            const isPasswordValid = await hashingOperations.verifyPassword(user.password, password);

            // if the password is invalid, return an error message
            if (!isPasswordValid) {
                return {
                    message: 'Invalid Credentials',
                    body: null,
                    status: 400
                }
            }

            // generate a JWT token
            const token = this.jwtService.sign({ userId: user.userId });

            // return the token
            return {
                message: 'Login successful',
                body: {
                    token
                },
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

    // service method to get all users
    async getAllUsers() {
        try {

            // get all the users
            const users = await this.prisma.user.findMany();

            // delete the password from each user object
            users.forEach(user => {
                delete user.password;
            });

            // return the users
            return {
                message: 'Users retrieved successfully',
                body: users,
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

    // service method to get a user by id
    async getUserById(userId: number) {
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

            // delete the password from the user object

            delete user.password;

            // return the user
            return {
                message: 'User retrieved successfully',
                body: user,
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

    // service method to update user profile
    async updateUserProfile(userId: number, body: userDto.UpdateUserDto) {
        try {

            // destruct the name, email, password and address from the updateUserDto
            const { name, email, password, address } = body;

            // check if there is at least one field to update
            if (!name && !email && !password && !address) {
                return {
                    message: 'At least one field is required',
                    body: null,
                    status: 400
                }
            }

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

            // hash the password
            let hashedPassword: string;
            if (password) {
                hashedPassword = await hashingOperations.hashPassword(password);
            }

            // check the fields that are to be updated
            // if the name is not provided, use the existing name
            // if the email is not provided, use the existing email
            // if the password is not provided, use the existing password
            // if the address is not provided, use the existing address
            // update the user
            const updatedUser = await this.prisma.user.update({
                where: {
                    userId
                },
                data: {
                    name: name || user.name,
                    email: email || user.email,
                    password: hashedPassword || user.password,
                    address: address || user.address
                }
            });


            // delete the password from the user object
            delete updatedUser.password;

            // return the updated user
            return {
                message: 'User updated successfully',
                body: updatedUser,
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

    // service method to delete a user
    async deleteUser(userId: number) {
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

            // delete the user
            await this.prisma.user.delete({
                where: {
                    userId
                }
            });

            // return a success message
            return {
                message: 'User deleted successfully',
                body: null,
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
