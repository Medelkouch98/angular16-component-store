import { GenderEnum } from '../enum';

export interface IStudent {
  id: number;
  name: string;
  gender: GenderEnum;
  birthDay: number;
  physics: number;
  maths: number;
  english: number;
}

export class Student implements IStudent {
  id: number;
  name: string;
  gender: GenderEnum;
  birthDay: number;
  physics: number;
  maths: number;
  english: number;
  action: string;

  constructor() {
    this.id = 1;
    this.name = '';
    this.gender = '' as unknown as GenderEnum;
    this.birthDay = null as unknown as number;
    this.physics = null as unknown as number;
    this.maths = null as unknown as number;
    this.english = null as unknown as number;
    this.action = '';
  }
}
