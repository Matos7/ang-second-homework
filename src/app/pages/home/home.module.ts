import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ProductRowComponent } from './../products-list/product-row/product-row.component';
import { ProductDetailComponent } from './../product-detail/product-detail.component';
import { ProductsListComponent } from './../products-list/products-list.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductRowComponent,
    ProductDetailComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    RouterModule
  ]
})
export class HomeModule { }
