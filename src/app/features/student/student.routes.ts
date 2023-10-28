import { Route } from '@angular/router';
import { StudentSearchComponent } from './components/student-search/student-search.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { StudentComponent } from './components/student.component';

export default [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: '',
        component: StudentSearchComponent,
      },
      {
        path: 'add',
        component: StudentAddComponent,
      },
      {
        path: ':idStudent',
        component: StudentViewComponent,
      },
    ],
  },
] as Route[];