import { dateToTimestamp } from "src/app/core/helpers";

export interface IStudentSearch {
  name: string;
  gender: string;
  birthDay: number;
  physics: number;
  maths: number;
  english: number;
  // dans le cas de recherche avec tri et pagination
  sort?: string;
  order?: string;
  per_page?: number;
  page?: number;
}
export class StudentSearch implements IStudentSearch {
  name: string;
  gender: string;
  birthDay: number;
  physics: number;
  maths: number;
  english: number;
  // dans le cas de recherche avec tri et pagination
  sort?: string;
  order?: string;
  per_page?: number;
  page?: number;
  constructor() {
    this.name = '';
    this.gender = '';
    this.birthDay = null as unknown as number;
    this.physics = null as unknown as number;
    this.maths = null as unknown as number;
    this.english = null as unknown as number;
  }
}
