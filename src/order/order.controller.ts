import { Controller, Post, Get, Body, Put, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto, updateOrderDto } from './dto';
import { parse } from 'path';

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


}
