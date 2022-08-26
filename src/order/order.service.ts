import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CottageService } from 'src/cottage/cottage.service';
import { LessThan,  Repository } from 'typeorm';
import { createOrderDto } from './dto';
import { OrderEntity } from './entity';
import { Tariff } from './enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private cottageService: CottageService,
  ) {}
  async getOrders() {
    return this.orderRepository.find();
  }
  async create(dto: createOrderDto) {
    if (dto.daysQty > 90) {
      throw new HttpException(
        'Максимальный срок аренды -  90 дней.',
        HttpStatus.BAD_REQUEST,
      );
    }
    dto.dateEnd = new Date(dto.dateStart);
    dto.dateStart = new Date(dto.dateStart);
    dto.dateEnd.setDate(dto.dateStart.getDate() + dto.daysQty);
    if (
      [6, 0].includes(dto.dateStart.getDay()) ||
      [6, 0].includes(dto.dateEnd.getDay())
    ) {
      throw new HttpException(
        'Начало и конец аренды не может выпадать на выходной день ',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      [12, 13].includes(dto.dateStart.getHours()) ||
      [12, 13].includes(dto.dateEnd.getHours())
    ) {
      throw new HttpException(
        `From 12:00 to 13:00  - Branchtime`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const cottage = await this.cottageService.findOne({
      id: dto.cottage.id,
      lastOrderDate: LessThan(dto.dateStart),
    });
    if (!cottage) {
      throw new HttpException(
        'В это время свободных коттеджей нет',
        HttpStatus.NOT_FOUND,
      );
    }
    console.log(cottage, cottage.lastOrderDate);
    const lastOrder = new Date(cottage.lastOrderDate);
    lastOrder.setDate(+lastOrder.getDate() + 2);
    if (lastOrder > dto.dateStart) {
      throw new HttpException(
        'Пауза между бронированиями должна составлять 2 дня',
        HttpStatus.BAD_REQUEST,
      );
    }

    const priceDay = await this.chooseTariff(dto.tariff);
    const totalPrice = priceDay * dto.daysQty;
    cottage.lastOrderDate = dto.dateEnd;
    await this.cottageService.updateOne(cottage);
    await this.orderRepository.save({ ...dto, totalPrice: totalPrice });
    return totalPrice;
  }

  async chooseTariff(tariff: Tariff) {
    if (tariff === 'usual') {
      return 2500;
    } else if (tariff === 'lux') {
      return 3500;
    } else if (tariff === 'superlux') {
      return 4500;
    }
  }
}
