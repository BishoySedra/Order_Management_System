import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as productDto from './dto/product.dto';

@Injectable()
export class ProductsService {

    // inject the PrismaService
    constructor(private prisma: PrismaService) { }

    // service method to create a product
    async createProduct(data: productDto.CreateProductDto) {
        try {

            // destructuring the data
            const { name, description, price, stock } = data;

            // check if the product already exists
            const product = await this.prisma.product.findFirst({
                where: {
                    name
                }
            });

            // if the product already exists, throw an error
            if (product) {
                return {
                    message: 'Product already exists',
                    body: null,
                    status: 409
                }
            }

            // create the product
            const newProduct = await this.prisma.product.create({
                data: {
                    name,
                    description,
                    price,
                    stock
                }
            });

            return {
                message: 'Product created successfully',
                body: newProduct,
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

    // service method to get all products
    async getAllProducts() {
        try {

            // get all products
            const products = await this.prisma.product.findMany();

            return {
                message: 'Products retrieved successfully',
                body: products,
                status: 200
            }

        } catch (error) {
            return {
                message: error.message,
                body: null,
                status: 500
            }
        }
    }

    // service method to get a product by id
    async getProductById(productId: number) {
        try {

            // check if the product exists
            const product = await this.prisma.product.findUnique({
                where: {
                    productId
                }
            });

            // if the product does not exist, throw an error
            if (!product) {
                return {
                    message: 'Product not found',
                    body: null,
                    status: 404
                }
            }

            return {
                message: 'Product retrieved successfully',
                body: product,
                status: 200
            }

        } catch (error) {
            return {
                message: error.message,
                body: null,
                status: 500
            }
        }
    }

    // service method to update a product
    async updateProduct(productId: number, data: productDto.UpdateProductDto) {
        try {

            // destructuring the data
            const { name, description, price, stock } = data;

            // check if there are fields to update
            if (!name && !description && !price && !stock) {
                return {
                    message: 'at least one field is required',
                    body: null,
                    status: 400
                }
            }

            // check if the product exists
            const product = await this.prisma.product.findUnique({
                where: {
                    productId
                }
            });

            // if the product does not exist, throw an error
            if (!product) {
                return {
                    message: 'Product not found',
                    body: null,
                    status: 404
                }
            }

            // update the product
            const updatedProduct = await this.prisma.product.update({
                where: {
                    productId
                },
                data: {
                    name: name || product.name,
                    description: description || product.description,
                    price: price || product.price,
                    stock: stock || product.stock
                }
            });

            // return the updated product
            return {
                message: 'Product updated successfully',
                body: updatedProduct,
                status: 200
            }


        } catch (error) {
            return {
                message: error.message,
                body: null,
                status: 500
            }
        }
    }

    // service method to delete a product
    async deleteProduct(productId: number) {
        try {

            // check if the product exists
            const product = await this.prisma.product.findUnique({
                where: {
                    productId
                }
            });

            // if the product does not exist, throw an error
            if (!product) {
                return {
                    message: 'Product not found',
                    body: null,
                    status: 404
                }
            }

            // delete the product
            await this.prisma.product.delete({
                where: {
                    productId
                }
            });

            return {
                message: 'Product deleted successfully',
                body: null,
                status: 200
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
