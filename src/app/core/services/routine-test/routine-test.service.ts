import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../../interfaces/address';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Vrp } from '../../interfaces/vrp';

@Injectable({
  providedIn: 'root',
})
export class RoutineTestService {

  private apiUrl: string = environment.ROTAFOOD_API;
  constructor(private http: HttpClient) { }

  autoGenerateRoutes(numberOfOrders: number, address: Address): Observable<Vrp> {
    const url = `${this.apiUrl}/v1/logistic/routes/test/${numberOfOrders}`;
    return this.http.post<Vrp>(url, address);
  }
}
