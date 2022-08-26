import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { createUserDto, loginUserDto } from 'src/user/dto';
import { AuthService } from './auth.service';
@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @ApiOperation({ summary: 'to enter in your account' })
  @Post('/login')
  login(@Body() dto: loginUserDto) {
    return this.service.login(dto);
  }

  @ApiOperation({ summary: 'to register your account' })
  @Post('/registration')
  regist(@Body() dto: createUserDto) {
    return this.service.registration(dto);
  }
}
