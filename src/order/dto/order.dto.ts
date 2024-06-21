import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDto {
    @IsNotEmpty({ message: 'User ID is required' })
    @IsNumber()
    userId: number;

    @IsNotEmpty({ message: 'Status is required' })
    @IsString()
    status: string;
}

export class updateOrderDto {
    @IsNotEmpty({ message: 'Status is required' })
    @IsString()
    status: string;
}

export class applyCouponDto {
    @IsNotEmpty({ message: 'Coupon code is required' })
    @IsString()
    couponCode: string;

    @IsNotEmpty({ message: 'Discount is required' })
    @IsNumber()
    discount: number;
}