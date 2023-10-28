import { FormControl, Validators } from '@angular/forms';
import { StudentSearch, IStudentSearch } from './student-search.model';

export interface IStudentSearchFormGroup {
  name: FormControl<string>;
  gender: FormControl<string>;
  birthDay: FormControl<Date>;
  physics: FormControl<number>;
  maths: FormControl<number>;
  english: FormControl<number>;
  // dans le cas de recherche avec tri et pagination
  sort?: FormControl<string>;
  order?: FormControl<string>;
  per_page?: FormControl<number>;
  page?: FormControl<number>;
}
export class StudentSearchFormGroup implements IStudentSearchFormGroup {
  name: FormControl<string>;
  gender: FormControl<string>;
  birthDay: FormControl<Date>;
  physics: FormControl<number>;
  maths: FormControl<number>;
  english: FormControl<number>;
  // dans le cas de recherche avec tri et pagination
  sort?: FormControl<string>;
  order?: FormControl<string>;
  per_page?: FormControl<number>;
  page?: FormControl<number>;
  constructor(userSearch: IStudentSearch = new StudentSearch()) {
    this.name = new FormControl(userSearch.name) as FormControl<string>;
    this.gender = new FormControl(userSearch.gender) as FormControl<string>;
    this.birthDay = new FormControl(
      userSearch.birthDay,
      Validators.pattern('\bd{2}/d{2}/d{4}\b')
    ) as FormControl<Date>;
    this.physics = new FormControl(
      userSearch.physics,
      Validators.maxLength(2)
    ) as FormControl<number>;
    this.maths = new FormControl(
      userSearch.maths,
      Validators.maxLength(2)
    ) as FormControl<number>;
    this.english = new FormControl(
      userSearch.english,
      Validators.maxLength(2)
    ) as FormControl<number>;
  }
}
