import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleInvoiceComponent } from './sale-invoice/sale-invoice.component';
import { MaterialModule } from '../material/material.module';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeModule } from '../home/home.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    SaleInvoiceComponent,
  
  
  ],
  imports: [
     CommonModule,
     HomeModule,
     SharedModule,
     MaterialModule
  ]
})
export class SalesModule { }
