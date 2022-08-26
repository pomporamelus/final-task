import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_CONFIG } from './utils/db_config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { CottageModule } from './cottage/cottage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DB_CONFIG),
    UserModule,
    AuthModule,
    OrderModule,
    CottageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
