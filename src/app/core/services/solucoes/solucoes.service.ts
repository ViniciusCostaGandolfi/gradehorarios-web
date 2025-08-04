import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolucaoDto } from '../../interfaces/solucao';
@Injectable({
  providedIn: 'root'
})
export class SolucoesService {
  private apiUrl: string = `${environment.GRADEHORARIOS_API}/v1/instituicoes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SolucaoDto[]> {
    return this.http.get<SolucaoDto[]>(`${this.apiUrl}/solucoes`);
  }


  get(instituicaoId: number, solucaoId: number): Observable<SolucaoDto> {
    return this.http.get<SolucaoDto>(`${this.apiUrl}/${instituicaoId}/solucoes/${solucaoId}`);
  }


  create(instituicaoId: number, file: File): Observable<SolucaoDto> {
    let formData = new FormData()
    formData.append('file', file)
    return this.http.post<SolucaoDto>(`${this.apiUrl}/${instituicaoId}/solucoes`, formData);
  }

  delete(instituicaoId: number, solucaoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${instituicaoId}/solucoes/`);
  }
}
