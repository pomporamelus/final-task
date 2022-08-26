import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createCottageDto, editCottageDto } from './dto';
import { CottageEntity } from './entity';

@Injectable()
export class CottageService {
  constructor(
    @InjectRepository(CottageEntity)
    private cottegeRepository: Repository<CottageEntity>,
  ) {}
  async getAll() {
    return this.cottegeRepository.find();
  }
  async findOne(options?): Promise<CottageEntity | null> {
    return await this.cottegeRepository.findOne({
      where: options,
    });
  }

  async create(dto: createCottageDto): Promise<CottageEntity> {
    const exist: CottageEntity = await this.findOne({
      name: dto.name,
    });
    if (exist) {
      throw new HttpException(
        'коттедж с таким именем уже существует',
        HttpStatus.CONFLICT,
      );
    }
    return await this.cottegeRepository.save(dto);
  }
  async update(dto: editCottageDto): Promise<CottageEntity> {
    const exist: CottageEntity = await this.findOne({
      id: dto.id,
    });
    if (!exist) {
      throw new HttpException(
        'коттедж с таким id не найден',
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(exist, dto);
    return await this.cottegeRepository.save(exist);
  }

  async updateOne(cottage) {
    return this.cottegeRepository.save(cottage);
  }

  async deleteOne(id: number) {
    const cottage = await this.findOne({ id:id });
    if (!cottage) {
      throw new HttpException(
        'Машина с таким id не найдена',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.cottegeRepository.delete(cottage);
    return { messsage: 'Машина была успешно удалена' };
  }
}
