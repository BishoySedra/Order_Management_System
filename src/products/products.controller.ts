import { Controller, Post, Body, Get, Delete, Put, Param } from '@nestjs/common';
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

    // endpoint to get all products
    @Get()
    async getAllProducts() {
        return this.productsService.getAllProducts();
    }

    // endpoint to get a product by id
    @Get(':productId')
    async getProductById(@Param('productId') productId: string) {
        return this.productsService.getProductById(parseInt(productId));
    }

    // endpoint to update a product
    @Put(':productId')
    async updateProduct(@Param('productId') productId: string, @Body() body: productDto.UpdateProductDto) {
        return this.productsService.updateProduct(parseInt(productId), body);
    }

    // endpoint to delete a product
    @Delete(':productId')
    async deleteProduct(@Param('productId') productId: string) {
        return this.productsService.deleteProduct(parseInt(productId));
    }

}
