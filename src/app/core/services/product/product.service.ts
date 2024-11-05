import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Observable } from 'rxjs';
import { Paginable } from '../../interfaces/paginable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = `${environment.ROTAFOOD_API}/products`;

  constructor(private http: HttpClient) { }

  get(
    searchParams?: any, 
    page: number = 1, 
    pageSize: number = 10
    ): Observable<Product[] | any> {

    let queryParams = new HttpParams()
    if (searchParams) {
      Object.keys(searchParams).forEach(key => {
        if (searchParams[key] !== null && searchParams[key] !== undefined) {
          queryParams = queryParams.append(key, searchParams[key].toString());
        }
      });
    }
    queryParams = queryParams.append('page', page.toString());
    queryParams = queryParams.append('pageSize', pageSize.toString());
    return this.http.get<Paginable<Product>>(`${this.apiUrl}/`, {params: queryParams});
  }
  
  create(product: Product): Observable<Product | any> {
    return this.http.post<Product>(`${this.apiUrl}/`, product);
  }  

  getById(id: number): Observable<Product | any> {
    const url = `${this.apiUrl}/${id}/`;
    return this.http.get<Product>(url);
  }
  
  editById(id: number, product: Product): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/`, product);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/`);
  }
}
