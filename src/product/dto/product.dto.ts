import { IsNotEmpty } from 'class-validator';

export class productDto {

    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @IsNotEmpty({ message: 'Price is required' })
    price: number;

    @IsNotEmpty({ message: 'Stock is required' })
    stock: number;
}