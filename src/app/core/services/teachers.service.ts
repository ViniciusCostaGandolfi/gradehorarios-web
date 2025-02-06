import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherDto } from '../interfaces/teacher-dto';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private apiUrl: string = `${environment.GRADEHORARIOS_API}/v1`;

  constructor(private http: HttpClient) {}

  /**
   * Cria ou atualiza um professor associado a uma faculdade.
   * @param teacher Dados do professor a serem criados ou atualizados.
   * @param collegeId ID da faculdade associada.
   * @returns Observable do professor atualizado/criado.
   */
  createOrUpdate(teacher: TeacherDto, collegeId: number): Observable<TeacherDto> {
    return this.http.put<TeacherDto>(`${this.apiUrl}/colleges/${collegeId}/teachers`, teacher);
  }

  /**
   * Busca todos os professores associados a uma faculdade.
   * @param collegeId ID da faculdade associada.
   * @returns Observable de uma lista de professores.
   */
  getAllByCollegeId(collegeId: number): Observable<TeacherDto[]> {
    return this.http.get<TeacherDto[]>(`${this.apiUrl}/colleges/${collegeId}/teachers`);
  }

  /**
   * Exclui um professor pelo seu ID e pela faculdade associada.
   * @param teacherId ID do professor a ser excluído.
   * @param collegeId ID da faculdade associada.
   * @returns Observable<void>.
   */
  deleteTeacher(teacherId: number, collegeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/colleges/${collegeId}/teachers/${teacherId}`);
  }
}
