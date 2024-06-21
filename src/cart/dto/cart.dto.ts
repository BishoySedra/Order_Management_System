import { IsNotEmpty } from 'class-validator';

export class CartProductDto {

    @IsNotEmpty({ message: 'User ID is required' })
    cartId: number;

    @IsNotEmpty({ message: 'Product ID is required' })
    productId: number;

    @IsNotEmpty({ message: 'Quantity is required' })
    qty: number;
}