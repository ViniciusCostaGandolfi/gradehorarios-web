import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolutionDto } from '../interfaces/solution-dto';

@Injectable({
  providedIn: 'root'
})
export class TimetableSolverService {
  private apiUrl: string = `${environment.GRADEHORARIOS_API}/v1/colleges`;

  constructor(private http: HttpClient) {}

  resolve(collegeId: number) {
    const url = `${this.apiUrl}/${collegeId}/solutions`

    return this.http.post<void>(url, {})
  }

  getAllSolutions(collegeId: number): Observable<SolutionDto[]> {
    const url = `${this.apiUrl}/${collegeId}/solutions`;
    return this.http.get<SolutionDto[]>(url);
  }

  deleteSolution(solutionId: number, collegeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${collegeId}/solutions/${solutionId}`);
  }
}
