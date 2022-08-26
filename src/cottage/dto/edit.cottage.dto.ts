import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, Length } from 'class-validator';
import { Column } from 'typeorm';

export class editCottageDto {
  @ApiProperty({ example: 5 })
  id: number;

  @ApiProperty({ example: 'A2' })
  @IsOptional()
  @Length(2, 5)
  @Column()
  name?: string;

  @ApiProperty({ example: 4 })
  @IsOptional()
  @IsNumberString()
  @Length(1, 1)
  @Column()
  floors?: string;

  @ApiProperty({ example: 12 })
  @IsOptional()
  @IsNumberString()
  @Length(1, 2)
  @Column()
  rooms?: string;
}
