import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dto';
import { UserEntity } from './entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: createUserDto) {
    return await this.userRepository.save(dto);
  }
  async getAllUsers() {
    return await this.userRepository.find();
  }
  async getUser(options) {
    const user = await this.userRepository.findOne({
      where: options
  })
    if(!user) {
      throw new HttpException('user   not found', HttpStatus.NOT_FOUND)
    }
    return user;
  }

  async delete(id) {
    const exist = await this.userRepository.findOneBy({ id });
    if (!exist) {
      throw new HttpException(
        'user with such id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userRepository.delete(exist);
    return 'user was succesfully deleted';
  }
}
