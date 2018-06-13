import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Add this
import { AboutComponent } from './about/about.component'; // Add this
import { AccountComponent } from './account/account.component'; // Add this
import { AccountDetailComponent } from './account-detail/account-detail.component'; // Add this
import { CustomerComponent } from './customer/customer.component'; // Add this
import { UploadImageComponent } from './upload-image/upload-image.component'; // Add this

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about/:id',
    component: AboutComponent
  },
  {
    path: 'account/:id/:id2',
    component: AccountComponent
  },
  {
    path: 'accountDetail/:id',
    component: AccountDetailComponent
  },
  {
    path: 'customer/:id',
    component: CustomerComponent
  },
  {
    path: 'uploadImage/:id',
    component: UploadImageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
