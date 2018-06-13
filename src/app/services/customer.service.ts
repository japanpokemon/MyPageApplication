import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Customer } from '../models/customer.model';


import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CustomerService {

  private serviceUrl = 'http://localhost:3000/customers/?email=';

  constructor(private http: HttpClient) {
    
   }

  getCustomer(email: string): Observable<Customer[]> {
    console.log(this.serviceUrl + email);
    return this.http.get<Customer[]>(this.serviceUrl + email)
    .catch(this.handleError); 
  }

  private handleError(error: any) {
    if (error instanceof Response) {
      console.log("Error: " +error.text());
    }
    return Observable.throw(error);
  }

}
