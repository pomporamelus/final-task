import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Length } from 'class-validator';

export class createUserDto {
  @ApiProperty({ example: 'islam' })
  @Length(2, 25, { message: 'no less 2 and no more 25 letters ' })
  name: string;

  @ApiProperty({ example: '555335577', description: 'user phone number' })
  @IsNumberString()
  @Length(9, 9)
  phone: string;

  @ApiProperty({ example: '12345' })
  @Length(4, 16, { message: 'no less 4 and no more 16 letters ' })
  password: string;
}
