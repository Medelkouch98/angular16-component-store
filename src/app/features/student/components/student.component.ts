import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentStore } from '../student.store';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [RouterOutlet],
  providers: [StudentStore, StudentService],
  template: ` <router-outlet /> `,
})
export class StudentComponent {
}
