import { Controller, Get, Body, Post, Put, Delete, Param, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    // function to return response for all product routes
    private async response(res: Response, product: any) {
        return res.status(product.status).json(product);
    }


    // get all products
    @Get()
    async getAllProducts(@Res() res: Response){
        return this.response(res, await this.productService.getAllProducts());
    }

    // get a single product by id
    @Get(':id')
    async getProductById(@Param('id') id: string, @Res() res: Response){
        return this.response(res, await this.productService.getProductById(parseInt(id)));
    }

    // create a product
    @Post()
    async createProduct(@Body() data: Prisma.ProductCreateInput, @Res() res: Response){
        return this.response(res, await this.productService.createProduct(data));
    }

    // update a product by id
    @Put(':id')
    async updateProduct(@Param('id') id: string, @Body() data: Prisma.ProductUpdateInput, @Res() res: Response){
        return this.response(res, await this.productService.updateProduct(parseInt(id), data));
    }

    // delete a product by id
    @Delete(':id')
    async deleteProduct(@Param('id') id: string, @Res() res: Response){
        return this.response(res, await this.productService.deleteProduct(parseInt(id)));
    }
}
