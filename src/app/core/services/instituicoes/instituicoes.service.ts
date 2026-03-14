import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import type { InstituicaoCreateDto, InstituicaoDto, InstituicaoFullDto, InstituicaoUpdateDto } from '../../interfaces/instituicao';

@Injectable({
  providedIn: 'root'
})
export class InstituicoesService {

  private apiUrl = `${environment.GRADEHORARIOS_API}/api/institutions`;
  private http = inject(HttpClient);

  getAll(): Observable<InstituicaoDto[]> {
    return this.http.get<InstituicaoDto[]>(this.apiUrl);
  }


  getById(instituicaoId: number): Observable<InstituicaoFullDto> {
    return this.http.get<InstituicaoFullDto>(`${this.apiUrl}/${instituicaoId.toString()}`);
  }

  getByIdFull(instituicaoId: number): Observable<InstituicaoFullDto> {
    return this.http.get<InstituicaoFullDto>(`${this.apiUrl}/${instituicaoId.toString()}`);
  }


  create(InstituicaoDto: InstituicaoCreateDto): Observable<InstituicaoDto> {
    return this.http.post<InstituicaoDto>(this.apiUrl, InstituicaoDto);
  }

  updateById(id: number, dto: InstituicaoUpdateDto): Observable<InstituicaoDto> {
    return this.http.post<InstituicaoDto>(`${this.apiUrl}/${id.toString()}`, dto);
  }


  deleteById(instituicaoId: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${instituicaoId.toString()}`);
  }
}
