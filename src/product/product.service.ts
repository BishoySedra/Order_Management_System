import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { customError } from 'src/errors/error';
import { errorHandler } from 'src/errors/errorHandler';
import { productDto } from './dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    // service method to create a product
    async createProduct(data: productDto) {
        try {

            // create a new product
            const product = await this.prisma.products.create({ data });

            return {
                message: 'Product created successfully',
                body: product,
                status: 201
            }

        } catch (error) {

            return errorHandler(error);

        }
    }

    // service method to get all products
    async getProducts() {
        try {

            // get all products
            const products = await this.prisma.products.findMany();

            return {
                message: 'Products fetched successfully',
                body: products,
                status: 200
            }

        } catch (error) {

            return errorHandler(error);

        }
    }

    // service method to get a single product
    async getProduct(id: number) {
        try {

            // get a single product
            const product = await this.prisma.products.findFirst({ where: { productId: id } });

            // if the product does not exist, return an error
            if (!product) {
                throw new customError('Product not found', 404);
            }

            return {
                message: 'Product fetched successfully',
                body: product,
                status: 200
            }

        } catch (error) {

            return errorHandler(error);

        }
    }

    // service method to update a product
    async updateProduct(id: number, data: productDto) {
        try {

            // get the product
            const product = await this.prisma.products.findUnique({ where: { productId: id } });

            // if the product does not exist, return an error
            if (!product) {
                throw new customError('Product not found', 404);
            }

            // update the product
            const updatedProduct = await this.prisma.products.update({ where: { productId: id }, data });

            return {
                message: 'Product updated successfully',
                body: updatedProduct,
                status: 200
            }

        } catch (error) {

            return errorHandler(error);

        }
    }

    // service method to delete a product
    async deleteProduct(id: number) {
        try {

            // get the product
            const product = await this.prisma.products.findUnique({ where: { productId: id } });

            // if the product does not exist, return an error
            if (!product) {
                throw new customError('Product not found', 404);
            }

            // delete the product
            await this.prisma.products.delete({ where: { productId: id } });

            return {
                message: 'Product deleted successfully',
                body: null,
                status: 200
            }

        } catch (error) {

            return errorHandler(error);

        }
    }

}
