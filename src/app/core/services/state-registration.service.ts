import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StateRegistrationDto } from '../interfaces/state-registration';


@Injectable({
  providedIn: 'root',
})
export class StateRegistrationService {
  private apiUrl: string = `${environment.GRADEHORARIOS_API}/v1/state-registration`;

  constructor(private http: HttpClient) {}

  /**
   * Get state registration by code.
   * @param code State registration code.
   * @returns Observable of StateRegistrationDto.
   */
  getStateRegistrationByCode(code: number): Observable<StateRegistrationDto> {
    return this.http.get<StateRegistrationDto>(`${this.apiUrl}/default-code/${code}`);
  }
}
