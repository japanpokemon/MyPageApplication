import { DataSource } from '@angular/cdk/collections';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';


export class AccountTableDataSource extends DataSource<Account> {
    accountData: Observable<Account[]>;
    originalDataSource: DataSource<Account>; 
    data: Account[];

    constructor(private paginator: MatPaginator, private sort: MatSort, private accountService: AccountService) {
        super();
        this.accountService.getAccount().subscribe(data => {
            this.data = data;
            console.log("data.length: " + this.data.length);
        }),
        error => {
            console.log("ERROR: " + error);
        }
    }

    connect(): Observable<Account[]>{
        const dataMutations = [
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
        ];

        //Set the paginators length
        this.paginator.length = this.data.length;

        return merge(...dataMutations).pipe(map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
        }));
    }

    disconnect() {}

    private getPagedData(data: Account[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    private getSortedData(data: Account[]) {
        if (!this.sort.active || this.sort.direction === '') {
        return data;
        }

        return data.sort((a, b) => {
        const isAsc = this.sort.direction === 'asc';
        switch (this.sort.active) {
            case 'account': return compare(a.account, b.account, isAsc);
            case 'status': return compare(a.status, b.status, isAsc);
            case 'balance': return compare(a.balance, b.balance, isAsc);
            default: return 0;
        }
        });
    }

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
