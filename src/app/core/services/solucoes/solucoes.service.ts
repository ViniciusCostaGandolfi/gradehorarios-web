import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import type { SolutionDto } from '../../interfaces/solucao';

@Injectable({
  providedIn: 'root'
})
export class SolucoesService {
  private apiUrl = `${environment.GRADEHORARIOS_API}/api/institutions`;
  private http = inject(HttpClient);

  getAll(): Observable<SolutionDto[]> {
    return this.http.get<SolutionDto[]>(`${this.apiUrl}/solutions`);
  }


  get(instituicaoId: number, solucaoId: number): Observable<SolutionDto> {
    return this.http.get<SolutionDto>(`${this.apiUrl}/${instituicaoId.toString()}/solutions/${solucaoId.toString()}`);
  }


  create(instituicaoId: number, file: File): Observable<SolutionDto> {
    const formData = new FormData()
    formData.append('file', file)
    return this.http.post<SolutionDto>(`${this.apiUrl}/${instituicaoId.toString()}/solutions`, formData);
  }

  delete(instituicaoId: number, solucaoId: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${instituicaoId.toString()}/solutions/${solucaoId.toString()}`);
  }
}
