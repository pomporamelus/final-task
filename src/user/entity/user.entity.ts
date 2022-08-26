import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enum';
import { IUser } from '../interface';

@Entity('user')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text', nullable: true, default: '' })
  name: string;
  @Column({ type: 'varchar', length: 9, nullable: false })
  phone: string;
  @Column({ type: 'enum', enum: Role, nullable: false, default: Role.CLIENT })
  role: Role;
  @ApiProperty({ example: 'password', description: 'Пароль' })
  @Column({ type: 'text', nullable: false })
  password: string;
}
