import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CollegeDto, FullCollegeDto } from '../../interfaces/college';

@Injectable({
  providedIn: 'root'
})
export class CollegesService {
  private apiUrl: string = `${environment.GRADEHORARIOS_API}/v1/colleges`;

  constructor(private http: HttpClient) {}

  /**
   * Get all colleges for the current user.
   * @returns Observable of a list of CollegeDto.
   */
  getAllColleges(): Observable<CollegeDto[]> {
    return this.http.get<CollegeDto[]>(`${this.apiUrl}`);
  }

  /**
   * Get all colleges with full details for the current user.
   * @returns Observable of a list of FullCollegeDto.
   */
  getAllFullColleges(): Observable<FullCollegeDto[]> {
    return this.http.get<FullCollegeDto[]>(`${this.apiUrl}/full`);
  }

  /**
   * Get college by ID.
   * @param collegeId ID of the college.
   * @returns Observable of CollegeDto.
   */
  getCollegeById(collegeId: number): Observable<FullCollegeDto> {
    return this.http.get<FullCollegeDto>(`${this.apiUrl}/${collegeId}`);
  }

  /**
   * Update or create a college.
   * @param collegeDto College data to update or create.
   * @returns Observable of CollegeDto.
   */
  createOrUpdate(collegeDto: CollegeDto): Observable<CollegeDto> {
    return this.http.put<CollegeDto>(`${this.apiUrl}`, collegeDto);
  }

  /**
   * Delete a college by ID.
   * @param collegeId ID of the college to delete.
   * @returns Observable of void.
   */
  deleteCollege(collegeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${collegeId}`);
  }
}
