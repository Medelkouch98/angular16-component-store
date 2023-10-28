import { GenderEnum } from '../enum';

export interface IStudent {
  id: number;
  name: string;
  gender: GenderEnum;
  birthDay: Date;
  physics: number;
  maths: number;
  english: number;
}
