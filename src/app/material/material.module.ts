import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    // BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
     MatSidenavModule,
     MatInputModule,
     MatFormFieldModule,
     MatCheckboxModule,
     MatButtonModule,
     MatExpansionModule,
     HighchartsChartModule,
     FormsModule,
     HttpClientModule,
     MatSelectModule ,
     MatDatepickerModule,
     MatNativeDateModule,
     NgxPaginationModule,
     MatButtonToggleModule,
     MatDialogModule
  ],
  exports:[
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
     MatSidenavModule,
     MatInputModule,
     MatFormFieldModule,
     MatCheckboxModule,
     MatButtonModule,
     MatExpansionModule,
     HighchartsChartModule,
     FormsModule,
     HttpClientModule,
     MatSelectModule ,
     MatDatepickerModule,
     MatNativeDateModule,
     FormsModule,
     ReactiveFormsModule,
     MatTableModule,
     NgxPaginationModule,
     MatDialogModule,
     MatButtonToggleModule,
    
    
  ]
})
export class MaterialModule { }
