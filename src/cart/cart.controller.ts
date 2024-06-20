import { Body, Controller, Post, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, addToCartDto } from './dto';

@Controller('cart')
export class CartController {

    constructor(private cartService: CartService) {}

    @Post(':userId')
    async createCart(@Param('userId') userId: CreateCartDto['userId']) {
        return this.cartService.createCart(userId);
    }

    @Post('add')
    async addToCart(@Body() data: addToCartDto) {
        return this.cartService.addToCart(data);
    }

}
