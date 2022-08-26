import { ApiProperty } from '@nestjs/swagger';
import { CottageEntity } from 'src/cottage/entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { Tariff } from '../enum/tariff.enum';
import { IOrder } from '../interface';

@Entity({
  name: 'order',
})
export class OrderEntity implements IOrder {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 9, nullable: false })
  phone: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Tariff,
    nullable: false,
  })
  tariff: Tariff;

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
  })
  daysQty: number;

  @ApiProperty()
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  dateStart: Date;

  @ApiProperty()
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  dateEnd: Date;

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
  })
  totalPrice: number;

  @ManyToOne(() => CottageEntity, (cottage) => cottage.orders)
  cottage: CottageEntity;
}
