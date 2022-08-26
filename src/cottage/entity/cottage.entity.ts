import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Length } from 'class-validator';
import { OrderEntity } from 'src/order/entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ICottage } from '../interface';

@Entity({
  name: 'cottage',
})
export class CottageEntity implements ICottage {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'A2' })
  @Length(2, 5)
  @Column()
  name: string;

  @ApiProperty()
  @IsNumberString()
  @Length(1, 1)
  @Column()
  floors: string;

  @ApiProperty()
  @IsNumberString()
  @Length(1, 2)
  @Column()
  rooms: string;

  @ApiProperty()
  @Column({
    type: 'date',
    default: new Date(),
  })
  lastOrderDate: Date;

  @OneToMany(() => OrderEntity, (order) => order.cottage)
  orders: OrderEntity[];
}
