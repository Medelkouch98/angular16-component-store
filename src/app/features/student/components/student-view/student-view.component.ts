import { Component } from '@angular/core';
import { StudentFormComponent } from '../student-form/student-form.component';
import { ModeEnum } from '../../enum';

@Component({
  selector: 'app-student-view',
  standalone: true,
  imports: [StudentFormComponent],
  template: `<app-student-form [mode]="mode"></app-student-form>`,
})
export class StudentViewComponent {
  mode = ModeEnum.view;
}
