import { Body, Controller, Post } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import * as couponDto from './dto/coupon.dto';

@Controller('coupons')
export class CouponsController {

    // inject the service
    constructor(private couponsService: CouponsService) { }

    // endpoint to create a new coupon
    @Post()
    async createCoupon(@Body() body: couponDto.createCouponDto) {
        return await this.couponsService.createCoupon(body);
    }

}
