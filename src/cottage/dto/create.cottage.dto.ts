import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsNotEmpty, IsNumberString, Length } from 'class-validator';
import { Column } from 'typeorm';

export class createCottageDto {
  @ApiProperty({ example: 'A2' })
  @Length(2, 5)
  @Column()
  name: string;

  @ApiProperty({ example: 2 })
  @IsNumberString()
  @Length(1, 1)
  @Column()
  floors: string;

  @ApiProperty({ example: 5 })
  @IsNumberString()
  @Length(1, 2)
  @Column()
  rooms: string;
}
