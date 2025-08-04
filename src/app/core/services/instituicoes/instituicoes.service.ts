import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InstituicaoFullDto, InstituicaoCreateDto, InstituicaoDto, InstituicaoUpdateDto } from '../../interfaces/instituicao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstituicoesService {

  private apiUrl: string = `${environment.GRADEHORARIOS_API}/v1/instituicoes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<InstituicaoDto[]> {
    return this.http.get<InstituicaoDto[]>(`${this.apiUrl}`);
  }


  getById(instituicaoId: number): Observable<InstituicaoFullDto> {
    return this.http.get<InstituicaoFullDto>(`${this.apiUrl}/${instituicaoId}`);
  }

  getByIdFull(instituicaoId: number): Observable<InstituicaoFullDto> {
    return this.http.get<InstituicaoFullDto>(`${this.apiUrl}/${instituicaoId}`);
  }


  create(InstituicaoDto: InstituicaoCreateDto): Observable<InstituicaoDto> {
    return this.http.post<InstituicaoDto>(`${this.apiUrl}`, InstituicaoDto);
  }

  updateById(InstituicaoDto: InstituicaoUpdateDto): Observable<InstituicaoDto> {
    return this.http.post<InstituicaoDto>(`${this.apiUrl}/${InstituicaoDto.id}}`, InstituicaoDto);
  }


  deleteById(instituicaoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${instituicaoId}`);
  }
}
