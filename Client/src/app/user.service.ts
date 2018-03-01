import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import  {Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  user = null;

  private signupUrl = 'http://localhost:3000/api/user/signup'; 
  private loginUrl = 'http://localhost:3000/api/user/login';
  
  constructor(private http : HttpClient ) { }

  register(user: any): Observable<any> {
    return this.http.post<any>(this.signupUrl, user, httpOptions);
  }

  login(user : any) : Observable<any>{
    return this.http.post<any>(this.loginUrl, user, httpOptions);
  }

  updateUser(user : any){
    this.user = user;
  }

  getUser() : any{
    return this.user;
  }


}
