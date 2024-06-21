import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { productDto } from './dto';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    // route to create a product
    @Post()
    async createProduct(@Body() data: productDto) {
        return this.productService.createProduct(data);
    }

    // route to get all products
    @Get()
    async getProducts() {
        return this.productService.getProducts();
    }

    // route to get a single product
    @Get(':id')
    async getProduct(@Param('id') id: string) {
        return this.productService.getProduct(parseInt(id));
    }

    // route to update a product
    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() data: productDto) {
        return this.productService.updateProduct(parseInt(id), data);
    }

    // route to delete a product
    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return this.productService.deleteProduct(parseInt(id));
    }

}
