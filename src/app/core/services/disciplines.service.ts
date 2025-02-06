import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DisciplineDto } from '../interfaces/discipline-dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisciplinesService {

  private apiUrl: string = `${environment.GRADEHORARIOS_API}/v1`;


  constructor(private readonly http: HttpClient) {}

  createOrUpdate(discipline: DisciplineDto, collegeId: number): Observable<DisciplineDto> {
    return this.http.put<DisciplineDto>(`${this.apiUrl}/colleges/${collegeId}/disciplines`, discipline)
  }

  getAllByCollegeId(collegeId: number): Observable<DisciplineDto[]> {
    return this.http.get<DisciplineDto[]>(`${this.apiUrl}/colleges/${collegeId}/disciplines`)

  }

  deleteDiscipline(disciplineId: number, collegeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/colleges/${collegeId}/disciplines/${disciplineId}`);
  }
  

}
