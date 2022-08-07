import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
// import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field'
import { HighchartsChartModule } from 'highcharts-angular';
import {MatCardModule} from '@angular/material/card'
import * as Highcharts from 'highcharts';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    HighchartsChartModule,
    SharedModule
   
  ]
  
})
export class HomeModule { }
