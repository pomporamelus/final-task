import { Tariff } from '../enum';

export interface IOrder {
  id: number;
  phone: string;
  tariff: Tariff;
  daysQty: number;
  dateStart: Date;
  dateEnd: Date;
  totalPrice: number;
}
