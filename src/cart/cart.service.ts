import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartProductDto } from './dto';
import { errorHandler } from 'src/errors/errorHandler';
import { customError } from 'src/errors/error';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) { }

    // service method to create a cart
    async createCart(userId: number) {
        try {

            // check if the user exists
            const user = await this.prisma.users.findFirst({ where: { userId } });

            if (!user) {
                throw new customError('User not found', 404);
            }

            // check if the user already has a cart
            const existingCart = await this.prisma.carts.findFirst({ where: { userId } });

            if (existingCart) {
                throw new customError('User already has a cart', 400);
            }

            // create a new cart
            const cart = await this.prisma.carts.create({ data: { userId } });

            return {
                message: 'Cart created successfully',
                body: cart,
                status: 201
            }

        } catch (error) {

            return errorHandler(error);

        }
    }

    // service method to add a product to the cart
    async addToCart(data: CartProductDto) {
        try {

            // check if th cart exists
            const cart = await this.prisma.carts.findFirst({ where: { cartId: data.cartId } });

            if (!cart) {
                throw new customError('Cart not found to be used!', 404);
            }

            // check if the product exists
            const product = await this.prisma.products.findFirst({ where: { productId: data.productId } });

            if (!product) {
                throw new customError('Product not found to be added', 404);
            }

            // check if the product is already in the cart
            const existingProduct = await this.prisma.cartProducts.findFirst({
                where: {
                    cartId: data.cartId,
                    productId: data.productId
                }
            });

            if (existingProduct) {

                // get the number of products in stock
                const stock = product.stock;

                // check if the quantity to be added is greater than the stock
                if (data.qty > stock) {
                    throw new customError('out of stock!', 400);
                }

                // if the product is already in the cart, we update the quantity
                const updatedProduct = await this.prisma.cartProducts.updateMany({
                    where: {
                        cartId: data.cartId,
                        productId: data.productId
                    },
                    data: { qty: existingProduct.qty + data.qty }
                });

                // update the stock of the product
                await this.prisma.products.update({
                    where: { productId: data.productId },
                    data: { stock: stock - data.qty }
                });

                return {
                    message: 'Product added to cart successfully',
                    body: updatedProduct,
                    status: 201
                }

            }

            // if the product is not in the cart, we add it

            // get the number of products in stock
            const stock = product.stock;

            // check if the quantity to be added is greater than the stock
            if (data.qty > stock) {
                throw new customError('out of stock!', 400);
            }

            // add the product to the cart
            const newProduct = await this.prisma.cartProducts.create({
                data: {
                    cartId: data.cartId,
                    productId: data.productId,
                    qty: data.qty
                }
            });

            // update the stock of the product
            await this.prisma.products.update({
                where: { productId: data.productId },
                data: { stock: stock - data.qty }
            });

            return {
                message: 'Product added to cart successfully',
                body: newProduct,
                status: 201
            }

        } catch (error) {

            return errorHandler(error);

        }
    }

    // service method to view the cart of a user
    async viewCart(userId: number) {
        try {

            // check if the user exists
            const user = await this.prisma.users.findFirst({ where: { userId } });

            if (!user) {
                throw new customError('User not found', 404);
            }

            // get the cartId from the userId
            const cartId = await this.prisma.carts.findFirst({ where: { userId } });

            // get the products in the cart
            const cart = await this.prisma.cartProducts.findMany({
                where: { cartId: cartId.cartId },
                include: { product: true }
            });

            return {
                message: 'Cart retrieved successfully',
                body: cart,
                status: 200
            }

        } catch (error) {

            return errorHandler(error);

        }
    }

    // service method to get all carts
    async getAllCarts() {
        try {

            const carts = await this.prisma.carts.findMany();

            return {
                message: 'Carts retrieved successfully',
                body: carts,
                status: 200
            }

        } catch (error) {

            return errorHandler(error);

        }
    }

    // service method to get a cart by ID
    async getCartById(cartId: number) {
        try {

            const cart = await this.prisma.carts.findFirst({ where: { cartId } });

            if (!cart) {
                throw new customError('Cart not found', 404);
            }

            return {
                message: 'Cart retrieved successfully',
                body: cart,
                status: 200
            }

        } catch (error) {

            return errorHandler(error);

        }
    }

    // service method to delete a cart
    async deleteCart(data: CartProductDto) {
        try {

            // check if the cart exists
            const cart = await this.prisma.carts.findFirst({ where: { cartId: data.cartId } });

            if (!cart) {
                throw new customError('Cart not found', 404);
            }

            // check if the product exists
            const product = await this.prisma.products.findFirst({ where: { productId: data.productId } });

            if (!product) {
                throw new customError('Product not found', 404);
            }

            // check if the product is in the cart
            const existingProduct = await this.prisma.cartProducts.findFirst({
                where: {
                    cartId: data.cartId,
                    productId: data.productId
                }
            });

            if (!existingProduct) {
                throw new customError('Product not found in cart', 404);
            }

            // delete the product from the cart
            await this.prisma.cartProducts.deleteMany({
                where: {
                    cartId: data.cartId,
                    productId: data.productId
                }
            });

            // update the stock of the product
            await this.prisma.products.update({
                where: { productId: data.productId },
                data: { stock: product.stock + existingProduct.qty }
            });

            return {
                message: 'Product deleted from cart successfully',
                status: 200
            }

        } catch (error) {

            return errorHandler(error);

        }
    }

    // service method to update a cart by updating the quantity of a product
    async updateCart(data: CartProductDto) {
        try {

            // check if the cart exists
            const cart = await this.prisma.carts.findFirst({ where: { cartId: data.cartId } });

            if (!cart) {
                throw new customError('Cart not found', 404);
            }

            // check if the product exists
            const product = await this.prisma.products.findFirst({ where: { productId: data.productId } });

            if (!product) {
                throw new customError('Product not found', 404);
            }

            // check if the product is in the cart
            const existingProduct = await this.prisma.cartProducts.findFirst({
                where: {
                    cartId: data.cartId,
                    productId: data.productId
                }
            });

            if (!existingProduct) {
                throw new customError('Product not found in cart', 404);
            }

            // get the number of products in stock
            const stock = product.stock;

            // check if the quantity to be updated is greater than the stock
            if (data.qty > stock) {
                throw new customError('out of stock!', 400);
            }

            // update the quantity of the product
            const updatedProduct = await this.prisma.cartProducts.updateMany({
                where: {
                    cartId: data.cartId,
                    productId: data.productId
                },
                data: { qty: data.qty }
            });

            // update the stock of the product
            await this.prisma.products.update({
                where: { productId: data.productId },
                data: { stock: stock - data.qty }
            });

            return {
                message: 'Cart updated successfully',
                body: updatedProduct,
                status: 200
            }

        } catch (error) {

            return errorHandler(error);

        }
    }

}
