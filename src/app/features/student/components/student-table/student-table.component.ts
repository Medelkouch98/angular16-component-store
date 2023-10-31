import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { IStudent, Student } from '../../models';
import { StudentStore } from '../../student.store';
import { Observable, take } from 'rxjs';
import { MatSortModule, Sort } from '@angular/material/sort';
import { PaginatedApiResponse } from 'src/app/shared/models';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TimestampToDatePipe } from 'src/app/shared/pipes/date.pipe';

@Component({
  selector: 'app-student-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgIf,
    AsyncPipe,
    DatePipe,
    MatIconModule,
    TimestampToDatePipe,
  ],
  templateUrl: './student-table.component.html',
  styles: [
    `
      table {
        width: 100%;
      }
    `,
  ],
})
export class StudentTableComponent implements OnInit {
  displayedColumns: string[] = Object.keys(Student);
  students$: Observable<PaginatedApiResponse<IStudent>> =
    this.studentsStore.students$;
  page$: Observable<{ [key: string]: number }> = this.studentsStore.pageEvent$;
  sort$: Observable<{ [key: string]: string[] }> = this.studentsStore.sort$;

  constructor(private studentsStore: StudentStore) {
    this.students$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => {
        console.log('StudentTableComponent.students$', data);
      },
    });
  }

  ngOnInit() {}

  public changePage(event: PageEvent): void {
    this.studentsStore.setPageEvent(event);
    this.studentsStore.studentsSearch();
  }

  public sortChange(sort: Sort): void {
    this.studentsStore.setSort(sort);
    this.studentsStore.studentsSearch();
  }

  public redirectToView(student: IStudent): void {
    this.studentsStore.goToDetailStudent(student.id);
  }
}
