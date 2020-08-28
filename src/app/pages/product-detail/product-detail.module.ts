import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ProductDetailRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ProductDetailModule {}
