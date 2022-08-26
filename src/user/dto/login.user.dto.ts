import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class loginUserDto {
  @ApiProperty({ example: '551295918', description: 'номер телефона' })
  @IsNumberString()
  @Length(9, 9)
  phone: string;
  @ApiProperty({ example: '12345', description: 'пароль' })
  @IsString()
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  password: string;
}
