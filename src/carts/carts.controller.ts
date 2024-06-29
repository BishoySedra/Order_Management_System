import { Controller, Post, Param, Body, Get, Put } from '@nestjs/common';
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
}
