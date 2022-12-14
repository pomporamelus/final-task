import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
// import * as bcrypt from 'bcrypt'
import { UserEntity } from 'src/user/entity';
import { createUserDto, loginUserDto } from 'src/user/dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(dto: loginUserDto) {
    const user = await this.userService.getUser({phone: dto.phone});
    if(!user) {
      throw new HttpException(
        'phone is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    // const passwordEqual = await bcrypt.compare(dto.password, user.password);
    // if (passwordEqual) {
    //   console.log(user);
    //   return this.generateToken(user);
    // }
    throw new HttpException(
      'password is incorrect',
      HttpStatus.BAD_REQUEST,
    );
  }

  async registration(dto: createUserDto) {
    const candidate = await this.userService.getUser({phone : dto.phone});
    if (candidate) {
      throw new HttpException(
        'user with such phone already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    // const hashPassword = await bcrypt.hash(dto.password, 5);
    let hashPassword = '123'
    const updatedUser = { ...dto, password: hashPassword };
    Object.assign(dto, updatedUser);
    console.log(dto);
    return await this.userService.createUser(dto);
  }
  private async generateToken(user: UserEntity) {
    const payLoad = { phone: user.phone, id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payLoad),
    };
  }
}
