import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {

    @IsNotEmpty()
    @IsNumber()
    userId: number;

}

export class AddProductDto {

    @IsNotEmpty()
    @IsNumber()
    cartId: number;

    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

}