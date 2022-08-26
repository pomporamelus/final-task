import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, Length } from 'class-validator';
import { CottageEntity } from 'src/cottage/entity';
import { Column } from 'typeorm';
import { Tariff } from '../enum';

export class createOrderDto {
  @ApiProperty({ example: '551295918' })
  @Length(9, 9)
  @IsNumberString()
  @Column()
  phone: string;
  @ApiProperty({ example: 'usual' })
  tariff: Tariff;
  @ApiProperty({ example: 3 })
  daysQty: number;
  @ApiProperty({ example: '2022-08-26T08:00:00' })
  dateStart: Date;
  @ApiProperty({ example: '2022-08-29T08:00:00' })
  @IsOptional()
  dateEnd?: Date;
  @ApiProperty()
  cottage: CottageEntity;
}
