import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { customError } from 'src/errors/error';
import { errorHandler } from 'src/errors/errorHandler';
import { productDto } from './dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    // service method to create a new product
    async createProduct(data: productDto) {
        try {
            
            // create a new product
            const product = await this.prisma.product.create({ data });

            // return the new product
            return {
                message: 'Product created successfully',
                body: product,
                status: 201
            }

        } catch (error) {

            // handle the error
            return errorHandler(error);
        }
    }
}
