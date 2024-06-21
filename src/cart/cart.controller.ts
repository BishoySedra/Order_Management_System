import { Body, Controller, Post, Param, Get, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartProductDto } from './dto';

@Controller('cart')
export class CartController {

    constructor(private cartService: CartService) { }

    // route to create a cart
    @Post(':userId')
    async createCart(@Param('userId') userId: string) {
        return this.cartService.createCart(parseInt(userId));
    }

    // route to add a product to the cart
    @Post('add')
    async addToCart(@Body() data: CartProductDto) {
        return this.cartService.addToCart(data);
    }

    // route to view the cart of a user
    @Get(':userId')
    async viewCart(@Param('userId') userId: string) {
        return this.cartService.viewCart(parseInt(userId));
    }

    // route to get all carts
    @Get()
    async getAllCarts() {
        return this.cartService.getAllCarts();
    }

    // route to get a cart by ID
    @Get('cartId/:cartId')
    async getCartById(@Param('cartId') cartId: string) {
        return this.cartService.getCartById(parseInt(cartId));
    }

    // route to delete a cart
    @Delete('delete')
    async deleteCart(@Body() data: CartProductDto) {
        return this.cartService.deleteCart(data);
    }

    // route to update a cart by updating the quantity of a product
    @Put('update')
    async updateCart(@Body() data: CartProductDto) {
        return this.cartService.updateCart(data);
    }

    // route to delete product from cart
    @Delete('remove')
    async removeFromCart(@Body() data: CartProductDto) {
        return this.cartService.removeFromCart(data);
    }

}
