import { Injectable } from '@nestjs/common';
import { OrderDto, updateOrderDto } from './dto';
import { Prisma, Orders } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { customError } from 'src/errors/error';
import { errorHandler } from 'src/errors/errorHandler';
import { stat } from 'fs';

@Injectable()
export class OrderService {

    // inject the Prisma service
    constructor(private prisma: PrismaService) { }

    // service method to create an order
    async createOrder(data: OrderDto) {
        try {

            // check if user exists
            const user = await this.prisma.users.findUnique({
                where: {
                    userId: data.userId,
                }
            });

            if (!user) {
                throw new customError('User not found', 404);
            }

            // check if the user has a cart
            const cart = await this.prisma.carts.findFirst({
                where: {
                    userId: data.userId,
                }
            });

            if (!cart) {
                throw new customError('User does not have a cart', 400);
            }

            // create an order
            const order = await this.prisma.orders.create({
                data: {
                    userId: data.userId,
                    status: data.status,
                }
            });

            // make the cart items the order items
            const cartItems = await this.prisma.cartProducts.findMany({
                where: {
                    cartId: cart.cartId,
                }
            });

            // create order items
            for (let i = 0; i < cartItems.length; i++) {
                await this.prisma.orderProducts.create({
                    data: {
                        orderId: order.orderId,
                        productId: cartItems[i].productId,
                    }
                });
            }

            return {
                message: 'Order created successfully',
                data: order,
                status: 201
            }

        } catch (error) {
            // handle error
            errorHandler(error);
        }
    }

    // service method to get all orders
    async getAllOrders() {
        try {
            // get all orders
            const orders = await this.prisma.orders.findMany();

            return {
                message: 'Orders retrieved successfully',
                data: orders,
                status: 200
            }

        } catch (error) {
            // handle error
            errorHandler(error);
        }
    }

    // service method to get an order by ID
    async getOrderById(orderId: number) {
        try {
            // get an order by ID
            const order = await this.prisma.orders.findUnique({
                where: {
                    orderId,
                }
            });

            return {
                message: 'Order retrieved successfully',
                data: order,
                status: 200
            }

        } catch (error) {
            // handle error
            errorHandler(error);
        }
    }

    // service method to update an order status by ID
    async updateOrderStatus(orderId: number, data: updateOrderDto) {
        try {
            // update an order status by ID
            const order = await this.prisma.orders.update({
                where: {
                    orderId,
                },
                data: {
                    status: data.status,
                }
            });

            return {
                message: 'Order status updated successfully',
                data: order,
                status: 200
            }

        } catch (error) {
            // handle error
            errorHandler(error);
        }
    }
}
