import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CottageController } from './cottage.controller';
import { CottageService } from './cottage.service';
import { CottageEntity } from './entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([CottageEntity])],
  controllers: [CottageController],
  providers: [CottageService],
  exports: [CottageService],
})
export class CottageModule {}
