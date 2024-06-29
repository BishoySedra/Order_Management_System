import { Controller, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import * as productDto from './dto/product.dto';

@Controller('products')
export class ProductsController {

    // inject the service
    constructor(private productsService: ProductsService) { }

    // endpoint to create a product
    @Post()
    async createProduct(@Body() data: productDto.CreateProductDto) {
        return this.productsService.createProduct(data);
    }

}
