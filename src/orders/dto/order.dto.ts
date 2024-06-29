import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createOrderDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    cartId: number;
}

export class updateOrderStatusDto {

    @IsNotEmpty()
    @IsNumber()
    orderId: number;

    @IsNotEmpty()
    @IsString()
    status: string;

}