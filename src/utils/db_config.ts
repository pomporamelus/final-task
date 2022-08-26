import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CottageEntity } from 'src/cottage/entity';
import { OrderEntity } from 'src/order/entity';
import { UserEntity } from 'src/user/entity';
require('dotenv').config();

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [UserEntity, CottageEntity, OrderEntity],
  autoLoadEntities: true,
  synchronize: true,
};
