import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { AccountService } from '../services/account.service';
import { MatSort, MatSortable, MatTableDataSource, MatPaginator } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Account } from '../models/account.model';
import { mergeAnalyzedFiles, CompileMetadataResolver } from '@angular/compiler';
import { AccountTableDataSource } from './account-data.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
  dataSource: AccountTableDataSource;
  customerEmail: string;
  customerName: string;

  displayedColumns = ['account', 'status', 'balance'];

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router) { 
    this.route.params.subscribe(res => {
      console.log(res.id);
      console.log(res.id2);
      this.customerEmail = res.id;
      this.customerName = res.id2;    
    });
  }

  ngOnInit() {
    this.dataSource = new AccountTableDataSource(this.paginator, this.sort, this.accountService);
    console.log(this.dataSource.originalDataSource);
    console.log(this.paginator);
  }

  //ngAfterViewInit() {
  //  console.log(this.paginator);
  //}

  //goAccountDetail(accountNO: string) {
  //  console.log(accountNO);
  //  this.router.navigate(['accountDetail']);
  //}

}

