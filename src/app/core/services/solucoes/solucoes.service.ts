import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolutionDto } from '../../interfaces/solucao';

@Injectable({
  providedIn: 'root'
})
export class SolucoesService {
  private apiUrl: string = `${environment.GRADEHORARIOS_API}/api/institutions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SolutionDto[]> {
    return this.http.get<SolutionDto[]>(`${this.apiUrl}/solutions`);
  }


  get(instituicaoId: number, solucaoId: number): Observable<SolutionDto> {
    return this.http.get<SolutionDto>(`${this.apiUrl}/${instituicaoId}/solutions/${solucaoId}`);
  }


  create(instituicaoId: number, file: File): Observable<SolutionDto> {
    let formData = new FormData()
    formData.append('file', file)
    return this.http.post<SolutionDto>(`${this.apiUrl}/${instituicaoId}/solutions`, formData);
  }

  delete(instituicaoId: number, solucaoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${instituicaoId}/solutions/${solucaoId}`);
  }
}
