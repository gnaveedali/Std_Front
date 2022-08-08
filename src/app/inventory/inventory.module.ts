import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDescriptionComponent } from './item-description/item-description.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ItemDescriptionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    // SharedModule
  ]
})
export class InventoryModule { }