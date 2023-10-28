export interface IStudentSearch {
  name: string;
  gender: string;
  birthDay: Date;
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
  birthDay: Date;
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
    this.birthDay = new Date();
    this.physics = 0;
    this.maths = 0;
    this.english = 0;
  }
}
