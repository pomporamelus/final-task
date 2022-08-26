import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.auth.decorator';
import { createOrderDto } from './dto';
import { OrderService } from './order.service';

@ApiTags('Order')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @ApiOperation({ summary: 'to get all orders (only owner)' })
  @Roles('owner')
  @UseGuards(RoleGuard)
  @Get()
  async getAll() {
    return await this.orderService.getOrders();
  }
  @ApiOperation({ summary: 'to create order (only client)' })
  @Roles('client')
  @UseGuards(RoleGuard)
  @Post()
  async create(@Body() dto: createOrderDto) {
    return await this.orderService.create(dto);
  }
}
