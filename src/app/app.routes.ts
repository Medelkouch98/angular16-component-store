import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/student/student.routes'),
      },
    ],
  },
];