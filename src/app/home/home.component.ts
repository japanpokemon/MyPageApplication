import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('goals', [
      transition('* => *',[
        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),
          ]))]), {optional: true}),
        
        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),
          ]))]), {optional: true})

      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'ログイン';
  emailText: string = '';
  pwText: string = '';
  errorText: string = '';
  goals = [];

  data: Customer;
  indCorp: string;

  constructor(private router: Router, private _data: DataService, private customerService: CustomerService) { 
    //this.errorText = '';
  }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  authItem() {
    
    this.customerService.getCustomer(this.emailText).subscribe(data => {
      console.log(data);
      this.data = data[0];
      if (this.data.isIndividual) {
        this.indCorp = "個人口座"
      } else {
        this.indCorp = "法人口座"
      }
      console.log(this.indCorp);
      //check mail address and pw
      if (this.pwText == this.data.password) {
        //this.router.navigateByUrl('/account/' + this.emailText);
        this.router.navigateByUrl('/account/' + this.emailText + '/' + this.data.fullname);
      }else {
          this.errorText = 'メールアドレスかパスワードが一致しません。';
      }
    }),
    error => {
      this.errorText = "ERROR: " + error;
    } 
  }

  removeItem(i) {
    this.goals.splice(i, 1);
    this._data.changeGoal(this.goals);
  }

}
