import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
// import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon'

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserLoginComponent } from './user-login/user-login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule}from '@angular/material/button';
import {MatExpansionModule}from '@angular/material/expansion'
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesModule } from './sales/sales.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { InventoryModule } from './inventory/inventory.module';




@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
  

    //ToolbarComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    HomeModule,
     BrowserAnimationsModule,
      MatInputModule,
     MatFormFieldModule,
      MatCheckboxModule,
     MatButtonModule,
     NgxPaginationModule,
    //  MatExpansionModule,
    //  HighchartsChartModule,
    //  FormsModule,
     SalesModule,
     HttpClientModule,
     ReactiveFormsModule,
     ToastrModule.forRoot({
      closeButton: true,
      timeOut: 15000, // 15 seconds
      progressBar: true,
    }),
    InventoryModule
  
  
    //  MatSelectModule ,
    //  MatDatepickerModule,
    //  MatNativeDateModule

   
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
