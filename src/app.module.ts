import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './models/product/product.module';
import { UsersModule } from './models/users/users.module';
import { CartModule } from './models/cart/cart.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), ProductModule, UsersModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
