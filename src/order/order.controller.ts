import { Controller, Post, Get, Body, Put, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto, updateOrderDto, applyCouponDto } from './dto';

@Controller('orders')
export class OrderController {

    // inject the order service
    constructor(private orderService: OrderService) { }

    // route to create an order
    @Post()
    async createOrder(@Body() data: OrderDto) {
        return this.orderService.createOrder(data);
    }

    // route to get all orders
    @Get()
    async getAllOrders() {
        return this.orderService.getAllOrders();
    }

    // route to get an order by ID
    @Get(':orderId')
    async getOrderById(@Param('orderId') orderId: string) {
        return this.orderService.getOrderById(parseInt(orderId));
    }

    // route to update an order status by ID
    @Put(':orderId/status')
    async updateOrderStatus(@Param('orderId') orderId: string, @Body() data: updateOrderDto) {
        return this.orderService.updateOrderStatus(parseInt(orderId), data);
    }

    // route to apply a coupon to an order
    @Post('apply-coupon')
    async applyCoupon(@Body() data: applyCouponDto) {
        return this.orderService.applyCoupon(data);
    }
}
