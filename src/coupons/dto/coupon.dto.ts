import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createCouponDto {
    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsNumber()
    discount: number;
}