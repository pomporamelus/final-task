import { Role } from '../enum';

export interface IUser {
  id: number;
  name: string;
  phone: string;
  role: Role;
  password: string;
}
