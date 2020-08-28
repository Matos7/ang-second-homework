import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemStatComponent } from '../item-stat/item-stat.component';
import { ItemReviewComponent } from '../item-review/item-review.component';

import { ProductDetailComponent } from './product-detail.component';

const itemRoutes: Routes = [
  { path: 'review', component: ItemReviewComponent },
  { path: 'stat', component: ItemStatComponent },
];

const routes: Routes = [
  { path: '', component: ProductDetailComponent, children: itemRoutes },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailRoutingModule {}
