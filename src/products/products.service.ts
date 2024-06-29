import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as productDto from './dto/product.dto';

@Injectable()
export class ProductsService {

    // inject the PrismaService
    constructor(private prisma: PrismaService) { }

    // service method
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

}
