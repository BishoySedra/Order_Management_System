import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as couponDto from './dto/coupon.dto';

@Injectable()
export class CouponsService {

    // inject the PrismaService
    constructor(private prisma: PrismaService) { }

    // service method to create a new coupon
    async createCoupon(body: couponDto.createCouponDto) {
        try {

            // destructuring the body object
            const { code, discount } = body;

            // check if the coupon already exists
            const coupon = await this.prisma.coupons.findUnique({
                where: {
                    code
                }
            });

            // if the coupon already exists, return an error
            if (coupon) {
                return {
                    message: 'Coupon already exists',
                    body: null,
                    status: 400
                }
            }

            // create the new coupon
            const newCoupon = await this.prisma.coupons.create({
                data: {
                    code,
                    discount
                }
            });

            // return the new coupon
            return {
                message: 'Coupon created',
                body: newCoupon,
                status: 201
            }


        } catch (error) {
            return {
                message: error.message,
                body: null,
                status: 500
            }
        }
    }

}
