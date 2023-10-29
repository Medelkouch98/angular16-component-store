import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedApiResponse } from 'src/app/shared/models';
import { IStudent } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {
    console.log('environment.apiUrl', environment.apiUrl);
  }

  searchStudents(params: any): Observable<PaginatedApiResponse<IStudent>> {
    console.log('searchStudents.params', params);

    return this.http.get<PaginatedApiResponse<IStudent>>(
      `${environment.apiUrl}students${params}`
    );
  }

  getStudent(idstudent: number): Observable<IStudent> {
    return this.http.get<IStudent>(
      `${environment.apiUrl}students/${idstudent}`
    );
  }

  addStudent(student: IStudent): Observable<IStudent> {
    return this.http.post<IStudent>(`${environment.apiUrl}students`, student);
  }

  updateStudent(
    idstudent: number,
    data: { [key: string]: any }
  ): Observable<IStudent> {
    return this.http.patch<IStudent>(
      `${environment.apiUrl}students/${idstudent}`,
      data
    );
  }

  deleteStudent(idstudent: number): Observable<IStudent> {
    return this.http.delete<IStudent>(
      `${environment.apiUrl}students/${idstudent}`
    );
  }
}
