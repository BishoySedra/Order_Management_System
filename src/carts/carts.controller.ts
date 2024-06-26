import { Controller, Post, Param, Body, Get, Put, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import * as cartDto from './dto/cart.dto';

@Controller('cart')
export class CartsController {

    // inject the service
    constructor(private cartsService: CartsService) { }

    // endpoint to add a product to a cart
    @Post('add')
    async addProduct(@Body() body: cartDto.AddProductDto) {
        return this.cartsService.addProduct(body);
    }

    // endpoint to create a cart
    @Post(':userId')
    async createCart(@Param('userId') userId: string) {
        return this.cartsService.createCart(parseInt(userId));
    }

    // endpoint to view a cart of a user
    @Get(':userId')
    async viewCart(@Param('userId') userId: string) {
        return this.cartsService.viewCart(parseInt(userId));
    }

    // endpoint to update the quantity of a product in a cart
    @Put('update')
    async updateProductQuantity(@Body() body: cartDto.AddProductDto) {
        return this.cartsService.updateProductQuantity(body);
    }

    // endpoint to remove a product from a cart
    @Delete('remove')
    async removeProduct(@Body() body: cartDto.removeProductDto) {
        return this.cartsService.removeProduct(body);
    }

    // endpoint to get all carts
    @Get()
    async getAllCarts() {
        return this.cartsService.getAllCarts();
    }

    // endpoint to get cart by id
    @Get('/cartId/:cartId')
    async getCartById(@Param('cartId') cartId: string) {
        return this.cartsService.getCartById(parseInt(cartId));
    }

    // endpoint to delete a cart by id
    @Delete(':cartId')
    async deleteCart(@Param('cartId') cartId: string) {
        return this.cartsService.deleteCart(parseInt(cartId));
    }
}
