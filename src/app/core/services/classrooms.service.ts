import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClassroomDto } from '../interfaces/classroom-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService {
  private apiUrl: string = `${environment.GRADEHORARIOS_API}/v1`;


  constructor(private readonly http: HttpClient) {}

  createOrUpdate(discipline: ClassroomDto, collegeId: number): Observable<ClassroomDto> {
    return this.http.put<ClassroomDto>(`${this.apiUrl}/colleges/${collegeId}/classrooms`, discipline)
  }

  getAllByCollegeId(collegeId: number): Observable<ClassroomDto[]> {
    return this.http.get<ClassroomDto[]>(`${this.apiUrl}/colleges/${collegeId}/classrooms`)

  }

  deleteClassroom(classroomId: number, collegeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/colleges/${collegeId}/classrooms/${classroomId}`);
  }
  
}
