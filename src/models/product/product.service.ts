import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    // service method to get all products
    async getAllProducts() {
        const products: Product[] = await this.prisma.product.findMany();
        
        if (products.length === 0 || products === null) {
            return {
                message: 'No products found',
                body: [],
                status: 404
            };
        }

        return {
            message: 'Products found',
            body: products,
            status: 200
        };
    }

    // service method to get a single product
    async getProductById(id: number) {
        
        const productFound: Product = await this.prisma.product.findUnique({
            where: { productId: id }
        });

        if (!productFound) {
            return {
                message: 'Product not found',
                body: [],
                status: 404
            };
        }

        return {
            message: 'Product found',
            body: productFound,
            status: 200
        };
    }

    // service method to create a product
    async createProduct(data: Prisma.ProductCreateInput) {

        // search for a product with the same name
        const productFound: Product = await this.prisma.product.findFirst({
            where: { name : data.name }
        });

        // if a product with the same name is found, return an error message
        if (productFound) {
            return {
                message: 'Product already exists',
                body: productFound,
                status: 409
            };
        }

        // create a new product
        const newProduct: Product = await this.prisma.product.create({
            data
        });

        return {
            message: 'Product created',
            body: newProduct,
            status: 201
        }
    }

    // service method to update a product by id and data in the request body
    async updateProduct(id: number, data: Prisma.ProductUpdateInput) {
        
        // search for a product by id
        const productFound: Product = await this.prisma.product.findUnique({
            where: { productId: id }
        });

        // if a product with the id is not found, return an error message
        if (!productFound) {
            return {
                message: 'Product not found',
                body: [],
                status: 404
            };
        }

        // update the product

        const updatedProduct: Product = await this.prisma.product.update({
            where: { productId: id },
            data
        });
        
        return {
            message: 'Product updated',
            body: updatedProduct,
            status: 200
        }
    }

    // service method to delete a product by id
    async deleteProduct(id: number) {
        
        // search for a product by id
        const productFound: Product = await this.prisma.product.findUnique({
            where: { productId: id }
        });

        // if a product with the id is not found, return an error message
        if (!productFound) {
            return {
                message: 'Product not found',
                body: [],
                status: 404
            };
        }

        // delete the product
        await this.prisma.product.delete({
            where: { productId: id }
        });

        return {
            message: 'Product deleted',
            body: [],
            status: 200
        }
    }
}
