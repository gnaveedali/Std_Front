import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { SaleInvoiceComponent } from './sales/sale-invoice/sale-invoice.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
      path:'login',
     component:UserLoginComponent
    },
    {
      path:'home',
     component:HomeComponent
    },
    {
      path:'sidebar',
      component:SidebarComponent
    },
    {
      path:'saleInvoice',
      component:SaleInvoiceComponent
    }
     
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
