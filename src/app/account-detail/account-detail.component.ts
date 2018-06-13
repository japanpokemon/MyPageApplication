import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AccountDetailService } from '../services/account-detail.service';
import { AccountDetail } from '../models/account-detail.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  accountNO: string;
  data: AccountDetail;
  indCorp: string;

  constructor(private route: ActivatedRoute, private router: Router, private accountDetailService: AccountDetailService) {
    this.route.params.subscribe(res => {
      console.log(res.id);
      this.accountNO = res.id;
    });
    console.log(this.accountNO);
    this.accountDetailService.getAccountDetail(this.accountNO).subscribe(data => {
      console.log(data);
      this.data = data[0];
      if (this.data.isIndividual) {
        this.indCorp = "個人"
      } else {
        this.indCorp = "法人"
      }
      console.log(this.indCorp);
    }),
    error => {
        console.log("ERROR: " + error);
    } 
  }

  ngOnInit() {
  }

}
