import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Cart, Prisma } from '@prisma/client';
import { stat } from 'fs';


@Injectable()
export class CartService {

    constructor(private prisma: PrismaService) {}

}
