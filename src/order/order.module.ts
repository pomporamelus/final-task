import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CottageModule } from 'src/cottage/cottage.module';
import { OrderEntity } from './entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [AuthModule, CottageModule, TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
