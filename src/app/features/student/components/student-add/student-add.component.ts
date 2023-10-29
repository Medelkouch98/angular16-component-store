import { Component } from '@angular/core';
import { StudentFormComponent } from '../student-form/student-form.component';
import { ModeEnum } from '../../enum';

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [StudentFormComponent],
  template: `<app-student-form [mode]="mode"></app-student-form>`,
})
export class StudentAddComponent {
  mode = ModeEnum.add;
}
