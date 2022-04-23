import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpClient: HttpClient) {}

  get() {
    return this.httpClient.get<Student[]>('https://localhost:7007/student');
  }

  post(payload: Student) {
    return this.httpClient.post<Student>(
      'https://localhost:7007/student',
      payload
    );
  }

  update(payload: Student) {
    return this.httpClient.put<Student>(
      'https://localhost:7007/student',
      payload
    );
  }

  delete(studetId: number) {
    return this.httpClient.delete(
      `https://localhost:7007/student?id=${studetId}`
    );
  }
}
