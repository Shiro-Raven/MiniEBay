import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {

  products: Array<any>;

  private getterUrl = 'http://localhost:3000/api/product/getProducts';
  private createUrl = 'http://localhost:3000/api/product/createProduct';
  private updateUrl = 'http://localhost:3000/api/product/updateProduct';
  private deleteUrl = 'http://localhost:3000/api/product/deleteProduct';

  constructor(private http: HttpClient) { }

  getProducts() : Observable<any>{
    return this.http.get<any>(this.getterUrl);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.createUrl, product, httpOptions);
  }

  editProduct(product: any): Observable<any>{
    const id = product._id;
    const url = `${this.updateUrl}/${id}`;
    return this.http.patch<any>(url, product, httpOptions);
  }

  deleteProduct (prodId: any): Observable<any> {
    const id = prodId;
    const url = `${this.deleteUrl}/${id}`;
    return this.http.delete<any>(url, httpOptions);
  }

}
