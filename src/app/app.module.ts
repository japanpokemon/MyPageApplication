import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import{ DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { UploadImageComponent } from './upload-image/upload-image.component';

import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AccountService } from './services/account.service';
import { AccountDetailService } from './services/account-detail.service';
import { CustomerService } from './services/customer.service';
import { UploadImageService } from './services/upload-image.service';
import { RouterModule, Routes } from '@angular/router';



const appRoutes: Routes = [
  { path: 'accountDetail', component: AccountDetailComponent },
  { path: 'customer', component: CustomerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AccountComponent,
    AccountDetailComponent,
    CustomerComponent,
    UploadImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [
    DataService,
    AccountService,
    AccountDetailService,
    CustomerService,
    UploadImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


