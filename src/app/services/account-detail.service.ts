import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AccountDetail } from '../models/account-detail.model';


import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AccountDetailService {

  private serviceUrl = 'http://localhost:3000/accountDetails/?account=';

  constructor(private http: HttpClient) {
    
   }

  getAccountDetail(accountNO: string): Observable<AccountDetail[]> {
    console.log(this.serviceUrl + accountNO);
    return this.http.get<AccountDetail[]>(this.serviceUrl + accountNO)
    .catch(this.handleError); 
  }

  private handleError(error: any) {
    if (error instanceof Response) {
      console.log("Error: " +error.text());
    }
    return Observable.throw(error);
  }
}

