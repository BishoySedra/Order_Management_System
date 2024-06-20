import { Controller, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { productDto } from './dto';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post()
    async createProduct(@Body() data: productDto) {
        return this.productService.createProduct(data);
    }


}
