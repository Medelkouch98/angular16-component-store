import { NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { IStudent } from '../../models';
import { StudentStore } from '../../student.store';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GenderEnum, ModeEnum } from '../../enum';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    NgIf,
    UpperCasePipe,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './student-form.component.html',
})
export class StudentFormComponent {
  @Input() mode!: string;
  student!: IStudent;
  studentForm: FormGroup;
  genders = [GenderEnum.Male, GenderEnum.Female];

  constructor(
    public studentStore: StudentStore,
    private store: Store<AppState>
  ) {
    this.studentForm = new FormGroup({
      name: new FormControl(
        '',
        this.mode === ModeEnum.search ? null : Validators.required
      ),
      gender: new FormControl(
        '',
        this.mode === ModeEnum.search ? null : Validators.required
      ),
      birthDay: new FormControl(
        '',
        this.mode === ModeEnum.search ? null : Validators.required
      ),
      physics: new FormControl(
        '',
        this.mode === ModeEnum.search
          ? Validators.maxLength(2)
          : [Validators.required, Validators.maxLength(2)]
      ),
      maths: new FormControl(
        '',
        this.mode === ModeEnum.search
          ? Validators.maxLength(2)
          : [Validators.required, Validators.maxLength(2)]
      ),
      english: new FormControl(
        '',
        this.mode === ModeEnum.search
          ? Validators.maxLength(2)
          : [Validators.required, Validators.maxLength(2)]
      ),
    });
    console.log(this.studentStore.studentsSearch);
  }

  onSubmit() {
    this.studentForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        console.log('studentForm', data);
      });
  }
}
