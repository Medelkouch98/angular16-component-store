import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  catchError,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IStudent, IStudentSearch, Student, StudentSearch } from './models';
import {
  IWsError,
  PaginatedApiResponse,
  WsErrorClass,
} from 'src/app/shared/models';
import { StudentService } from './services/student.service';
import { ToastrService } from 'ngx-toastr';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { RouterParamsSelector } from 'src/app/core/store/router/router.selector';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { generateUrl } from 'src/app/core/helpers';

export interface StudentsState {
  students: PaginatedApiResponse<IStudent>;
  searchForm: IStudentSearch;
  sort: { [key: string]: string[] };
  pageEvent: {
    [key: string]: number;
  };
  student: IStudent;
  errors: IWsError;
}

export const initialStudentsState: StudentsState = {
  students: [] as unknown as PaginatedApiResponse<IStudent>,
  searchForm: new StudentSearch(),
  sort: {
    _sort: ['physics', 'maths', 'english'],
    _order: ['asc'],
  },
  pageEvent: {
    _page: 0,
    _limit: 5,
  },
  student: new Student(),
  errors: null as unknown as IWsError,
};

@Injectable()
export class StudentStore extends ComponentStore<StudentsState> {
  students$ = this.select((state: StudentsState) => state.students);
  sort$ = this.select((state: StudentsState) => state.sort);
  searchForm$ = this.select((state: StudentsState) => state.searchForm);
  pageEvent$ = this.select((state: StudentsState) => state.pageEvent);
  student$ = this.select((state: StudentsState) => state.student);

  constructor(
    private studentService: StudentService,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {
    super(initialStudentsState);
    console.log('state data', initialStudentsState);
  }

  private setWsError = (
    error: HttpErrorResponse,
    errorMessage: string,
    showToaster: boolean = false
  ) => {
    const iWsError: IWsError = new WsErrorClass(error);
    this.patchState({
      errors: iWsError,
    });
    this.toaster.error(errorMessage);
    return of(error);
  };

  setSort = this.updater((state: StudentsState, sort: Sort) => ({
    ...state,
    sort: {
      ...state.sort,
      _order: [sort.direction],
    },
    pageEvent: { ...state.pageEvent, _page: 0 },
  }));

  setPageEvent = (pageEvent: PageEvent) =>
    this.patchState({
      pageEvent: {
        _page: pageEvent.pageIndex,
        _limit: pageEvent.pageSize,
      },
    });

  setSearchForm = this.updater(
    (state: StudentsState, searchForm: IStudentSearch) => ({
      ...state,
      searchForm,
      pageEvent: { ...state.pageEvent, pageIndex: 0 },
      searchClicked: true,
    })
  );

  resetSearchForm = () => this.patchState({ searchForm: new StudentSearch() });

  initialiseStudent = () =>
    this.patchState({
      student: new Student(),
    });

  goToDetailStudent = this.effect((idstudent$: Observable<number>) =>
    idstudent$.pipe(
      tap((idstudent: number) =>
        this.router.navigate([idstudent], { relativeTo: this.route })
      )
    )
  );

  patchStudentSuccess = this.updater(
    (state: StudentsState, student: IStudent) => ({
      ...state,
      student: {
        ...state.student,
        ...student,
      },
    })
  );

  studentsSearch = this.effect((trigger$) =>
    trigger$.pipe(
      withLatestFrom(this.sort$, this.searchForm$, this.pageEvent$),
      take(1),
      switchMap(([_, sort, searchForm, pageEvent]) => {
        return this.studentService
          .searchStudents(generateUrl([sort, pageEvent, searchForm]))
          .pipe(
            take(1),
            tap((students: PaginatedApiResponse<IStudent>) => {
              this.patchState({ students });
              console.log('state studentsSearch', initialStudentsState);
            }),
            catchError((error: HttpErrorResponse) =>
              this.setWsError(error, 'searchClientsError')
            )
          );
      })
    )
  );

  getStudent = this.effect((trigger$) =>
    trigger$.pipe(
      withLatestFrom(this.store.pipe(select(RouterParamsSelector))),
      switchMap(([_, params]: [any, Params]) =>
        this.studentService.getStudent(params['idstudent']).pipe(
          tap((student: IStudent) => {
            this.patchState({ student });
          }),
          catchError((error: HttpErrorResponse) => {
            return this.setWsError(error, 'studentInfosFicheError');
          })
        )
      )
    )
  );

  addStudent = this.effect((student$: Observable<IStudent>) =>
    student$.pipe(
      switchMap((student: IStudent) =>
        this.studentService.addStudent(student).pipe(
          tap((_: IStudent) => {
            this.toaster.success('student add successfully');
            this.studentsSearch();
          }),
          catchError((error: HttpErrorResponse) =>
            this.setWsError(error, 'studentAddError', true)
          )
        )
      )
    )
  );

  updateStudent = this.effect(
    (
      student$: Observable<{
        idstudent: number;
        data: { [key: string]: any };
      }>
    ) =>
      student$.pipe(
        switchMap(
          (student: { idstudent: number; data: { [key: string]: any } }) =>
            this.studentService
              .updateStudent(student.idstudent, student.data)
              .pipe(
                tap((student: IStudent) => {
                  this.patchStudentSuccess(student);
                  this.studentsSearch();
                  this.toaster.success('student updated successfully');
                }),
                catchError((error: HttpErrorResponse) =>
                  this.setWsError(error, 'studentUpdateError', true)
                )
              )
        )
      )
  );

  deleteStudent = this.effect((idstudent$: Observable<number>) =>
    idstudent$.pipe(
      switchMap((idstudent: number) =>
        this.studentService.deleteStudent(idstudent).pipe(
          tap(() => {
            this.toaster.success('student deleted successfully');
            this.studentsSearch();
          }),
          catchError((error: HttpErrorResponse) =>
            this.setWsError(error, 'studentDeleteError', true)
          )
        )
      )
    )
  );
}
