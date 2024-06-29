import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as orderDto from './dto/order.dto';

@Injectable()
export class OrdersService {

    // inject the PrismaService
    constructor(private prisma: PrismaService) { }

    // service method to create a new order
    async createOrder(body: orderDto.createOrderDto) {
        try {

            // destructuring the body object
            const { userId, cartId } = body;

            // check if the user has a cart
            const cart = await this.prisma.cart.findUnique({
                where: {
                    cartId, userId
                }
            });

            // if the cart does not exist, return an error
            if (!cart) {
                return {
                    message: 'Invalid user or cart',
                    body: null,
                    status: 404
                }
            }

            // create a new order
            const order = await this.prisma.order.create({
                data: {
                    userId,
                    total: 0,
                    status: 'PENDING',
                    orderDate: new Date(),
                }
            });

            // get the cart items
            const cartItems = await this.prisma.cartProduct.findMany({
                where: {
                    cartId
                }
            });

            // order the items
            let totalPrice = 0;
            for (let item of cartItems) {

                // get the product
                const product = await this.prisma.product.findUnique({
                    where: {
                        productId: item.productId
                    }
                });

                // create the order item
                const createdCartItemOrder = await this.prisma.orderProduct.create({
                    data: {
                        orderId: order.orderId,
                        productId: item.productId,
                        quantity: item.quantity,
                        total: item.quantity * product.price
                    }
                });

                // update the total price
                totalPrice += createdCartItemOrder.total;
            }

            // update the order total price
            await this.prisma.order.update({
                where: {
                    orderId: order.orderId
                },
                data: {
                    total: totalPrice
                }
            });

            // return the order
            return {
                message: 'Order created successfully',
                body: order,
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

    // service method to get order by id
    async getOrderById(orderId: number) {
        try {

            // check if the order exists
            const order = await this.prisma.order.findUnique({
                where: {
                    orderId
                }
            });

            // if the order does not exist, return an error
            if (!order) {
                return {
                    message: 'Order not found',
                    body: null,
                    status: 404
                }
            }

            // get the order items
            const orderItems = await this.prisma.orderProduct.findMany({
                where: {
                    orderId
                }, select: {
                    quantity: true,
                    total: true,
                    product: {
                        select: {
                            name: true,
                            price: true
                        }
                    }
                }
            });

            // return the order and its items
            return {
                message: 'Order found',
                body: {
                    order,
                    orderItems
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

    // service method to update order status
    async updateOrderStatus(orderId: orderDto.updateOrderStatusDto["orderId"], body: orderDto.updateOrderStatusDto['status']) {
        try {

            // destructuring the body object
            const status: string = body["status"];

            // check if the order exists
            const order = await this.prisma.order.findUnique({
                where: {
                    orderId
                }
            });

            // if the order does not exist, return an error
            if (!order) {
                return {
                    message: 'Order not found',
                    body: null,
                    status: 404
                }
            }

            // update the order status
            const updatedStatus = await this.prisma.order.update({
                where: {
                    orderId,
                },
                data: {
                    status,
                }
            });

            // return the updated order
            return {
                message: 'Order status updated',
                body: updatedStatus,
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