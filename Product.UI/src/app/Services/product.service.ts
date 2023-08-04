import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  data:any;

  private apiUrl = 'https://localhost:7214/api/Product';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    debugger
     const temp = this.http.get<Product[]>(this.apiUrl);
    return this.http.get<Product[]>(this.apiUrl);
  }
}
