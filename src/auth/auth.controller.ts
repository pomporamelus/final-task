import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { createUserDto, loginUserDto } from 'src/user/dto';
import { AuthService } from './auth.service';
@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @ApiOperation({ summary: 'to enter in your account' })
  @Post('/login')
  async login(@Body() dto: loginUserDto) {
    return await this.service.login(dto);
  }

  @ApiOperation({ summary: 'to register your account' })
  @Post('/registration')
  async regist(@Body() dto: createUserDto) {
    return await this.service.registration(dto);
  }
}
