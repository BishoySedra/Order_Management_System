import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto, addToCartDto } from './dto';
import { errorHandler } from 'src/errors/errorHandler';
import { customError } from 'src/errors/error';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // Service method to create a new cart
  async createCart(userId: CreateCartDto['userId']) {
    try {

        // check if user already has a cart
        const existingCart = await this.prisma.cart.findFirst({
            where: {
                userId
            }
        });

        // if user already has a cart, return the cart
        if(existingCart){
            throw new customError('User already has a cart', 400 );
        }

        // create a new cart
        const cart = await this.prisma.cart.create({
            data:{
                userId
            }
        });

      return {
        message: 'Cart created successfully',
        body: cart,
        status: 201,
      };

    } catch (error) {

      return errorHandler(error);

    }
  }

    // Service method to add a product to the cart
    async addToCart(data: addToCartDto) {
        try {

            // check if user has a cart
            const existingCart = await this.prisma.cart.findFirst({
                where: {
                    userId: data.userId
                }
            });

            // if user does not have a cart, return an error
            if(!existingCart){
                throw new customError('User does not have a cart', 400 );
            }

            // check if product already exists in the cart
            const existingProduct = await this.prisma.cartProduct.findFirst({
                where: {
                    cartId: existingCart.cartId,
                    productId: data.productId
                }
            });

            // if product already exists in the cart, update the quantity
            if(existingProduct){
                await this.prisma.cartProduct.update({
                    where: {
                        id: existingProduct.id
                    },
                    data: {
                        qty: existingProduct.qty + data.quantity
                    }
                });
            } else {
                // if product does not exist in the cart, add the product to the cart
                await this.prisma.cartProduct.create({
                    data: {
                        cartId: existingCart.cartId,
                        productId: data.productId,
                        qty: data.quantity
                    }
                });
            }

            return {
                message: 'Product added to cart successfully',
                status: 201,
            };

        } catch (error) {

            return errorHandler(error);

        }
    }
}
