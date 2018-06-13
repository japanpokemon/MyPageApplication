import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Account } from '../models/account.model';


import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AccountService {

  private serviceUrl = 'http://localhost:3000/accounts';

  constructor(private http: HttpClient) {
    
   }

  getAccount(): Observable<Account[]> {
    return this.http.get<Account[]>(this.serviceUrl)
    .catch(this.handleError); 
  }

  private handleError(error: any) {
    if (error instanceof Response) {
      console.log("Error: " +error.text());
    }
    return Observable.throw(error);
  }
}
