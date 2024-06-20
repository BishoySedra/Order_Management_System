import { IsNotEmpty } from 'class-validator';

export class CreateCartDto {
    @IsNotEmpty({ message: 'User ID is required' })
    userId: number;
}

export class addToCartDto {

    @IsNotEmpty({ message: 'User ID is required' })
    userId: number;

    @IsNotEmpty({ message: 'Product ID is required' })
    productId: number;

    @IsNotEmpty({ message: 'Quantity is required' })
    quantity: number;
}