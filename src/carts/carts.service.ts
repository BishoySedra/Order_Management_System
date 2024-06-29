import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as cartDto from './dto/cart.dto';

@Injectable()
export class CartsService {

    // inject the PrismaService
    constructor(private prisma: PrismaService) { }

    // service method to create a cart
    async createCart(userId: cartDto.CreateCartDto['userId']) {
        try {

            // check if the user exists
            const user = await this.prisma.user.findUnique({
                where: {
                    userId
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

            // check if the user already has a cart
            const cart = await this.prisma.cart.findFirst({
                where: {
                    userId
                }
            });

            // if the user already has a cart, throw an error
            if (cart) {
                return {
                    message: 'User already has a cart',
                    body: null,
                    status: 400
                }
            }

            // create a cart
            const createdCart = await this.prisma.cart.create({
                data: {
                    user: {
                        connect: {
                            userId
                        }
                    }
                }
            });

            return {
                message: 'Cart created successfully',
                body: createdCart,
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

    // service method to add a product to a cart
    async addProduct(body: cartDto.AddProductDto) {
        try {

            // destructure the body
            const { cartId, productId, quantity } = body;

            // check if the cart exists
            const cart = await this.prisma.cart.findUnique({
                where: {
                    cartId
                }
            });

            // if the cart does not exist, throw an error
            if (!cart) {
                return {
                    message: 'Cart not found',
                    body: null,
                    status: 404
                }
            }

            // check if the product exists
            const product = await this.prisma.product.findUnique({
                where: {
                    productId
                }
            });

            // if the product does not exist, throw an error
            if (!product) {
                return {
                    message: 'Product not found',
                    body: null,
                    status: 404
                }
            }

            // check if the product is already in the cart
            const productInCart = await this.prisma.cartProduct.findFirst({
                where: {
                    cartId,
                    productId
                }
            });

            if (productInCart) {
                // check if the quantity is greater than the available quantity
                if (quantity > product.stock) {
                    return {
                        message: 'Quantity exceeds available quantity',
                        body: null,
                        status: 400
                    }
                }

                // update the quantity of the product in the cart
                const updatedProduct = await this.prisma.cartProduct.update({
                    where: {
                        cartId_productId: {
                            cartId,
                            productId
                        }
                    },
                    data: {
                        quantity: productInCart.quantity + quantity
                    }
                });

                // update the product stock
                await this.prisma.product.update({
                    where: {
                        productId
                    },
                    data: {
                        stock: product.stock - quantity
                    }
                });

                return {
                    message: 'Product added to cart',
                    body: updatedProduct,
                    status: 200
                }
            }

            // check if the quantity is greater than the available quantity
            if (quantity > product.stock) {
                return {
                    message: 'Quantity exceeds available quantity',
                    body: null,
                    status: 400
                }
            }

            // add the product to the cart
            const addedProduct = await this.prisma.cartProduct.create({
                data: {
                    cart: {
                        connect: {
                            cartId
                        }
                    },
                    product: {
                        connect: {
                            productId
                        }
                    },
                    quantity
                }
            });

            // update the product stock
            await this.prisma.product.update({
                where: {
                    productId
                },
                data: {
                    stock: product.stock - quantity
                }
            });

            return {
                message: 'Product added to cart',
                body: addedProduct,
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

    // service method to view a cart
    async viewCart(userId: cartDto.CreateCartDto['userId']) {
        try {

            // check if the user exists
            const user = await this.prisma.user.findUnique({
                where: {
                    userId
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

            // check if the user has a cart
            const cart = await this.prisma.cart.findFirst({
                where: {
                    userId
                }
            });

            // if the user does not have a cart, throw an error
            if (!cart) {
                return {
                    message: 'Cart not found',
                    body: null,
                    status: 404
                }
            }

            // get the cart products
            const cartProducts = await this.prisma.cartProduct.findMany({
                where: {
                    cartId: cart.cartId
                },
                include: {
                    product: {
                        select: {
                            name: true,
                            price: true
                        }
                    }
                }
            });

            return {
                message: 'Cart retrieved successfully',
                body: cartProducts,
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

    // service method to update the quantity of a product in a cart
    async updateProductQuantity(body: cartDto.AddProductDto) {

        try {

            // destructuring the body
            const { cartId, productId, quantity } = body;

            // check if the cart exists
            const cart = await this.prisma.cart.findUnique({
                where: {
                    cartId
                }
            });

            // if the cart does not exist, throw an error
            if (!cart) {
                return {
                    message: 'Cart not found',
                    body: null,
                    status: 404
                }
            }

            // check if the product exists
            const product = await this.prisma.product.findUnique({
                where: {
                    productId
                }
            });

            // if the product does not exist, throw an error
            if (!product) {
                return {
                    message: 'Product not found',
                    body: null,
                    status: 404
                }
            }

            // check if the product is in the cart
            const productInCart = await this.prisma.cartProduct.findFirst({
                where: {
                    cartId,
                    productId
                }
            });

            // if the product is not in the cart, throw an error
            if (!productInCart) {
                return {
                    message: 'Product not in cart',
                    body: null,
                    status: 404
                }
            }

            // to be continued...

            return {
                message: 'Product quantity updated successfully',
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
