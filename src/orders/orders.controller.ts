import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import * as orderDto from './dto/order.dto';

@Controller('orders')
export class OrdersController {

    // inject the service
    constructor(private ordersService: OrdersService) { }

    // endpoint to create a new order
    @Post()
    async createOrder(@Body() body: orderDto.createOrderDto) {
        return this.ordersService.createOrder(body);
    }

    // endpoint get order by id
    @Get(':orderId')
    async getOrderById(@Param('orderId') orderId: string) {
        return this.ordersService.getOrderById(parseInt(orderId));
    }

    // endpoint to update order status
    @Put(':orderId/status')
    async updateOrderStatus(@Param('orderId') orderId: string, @Body() status: orderDto.updateOrderStatusDto['status']) {
        return this.ordersService.updateOrderStatus(parseInt(orderId), status);
    }

    // endpoint to apply coupon to order [BONUS]
    @Post('apply-coupon')
    async applyCoupon(@Body() body: orderDto.applyCouponDto) {
        return this.ordersService.applyCoupon(body);
    }

}
