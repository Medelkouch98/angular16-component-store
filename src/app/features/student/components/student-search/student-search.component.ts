import { Component } from '@angular/core';
import { StudentFormComponent } from '../student-form/student-form.component';
import { ModeEnum } from '../../enum';
import { StudentTableComponent } from '../student-table/student-table.component';

@Component({
  selector: 'app-student-search',
  standalone: true,
  imports: [StudentFormComponent, StudentTableComponent],
  template: `
  <!-- <app-student-form [mode]="mode"></app-student-form> -->
    <app-student-table></app-student-table>
  `,
})
export class StudentSearchComponent {
  mode = ModeEnum.search;
}
