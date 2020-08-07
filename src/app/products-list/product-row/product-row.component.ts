import { Product } from './../../core/models/product';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.scss']
})
export class ProductRowComponent {

  @Input()
  public product: Product;

  @Output()
  public selectedProduct: EventEmitter<any> = new EventEmitter();
  
  constructor() {}

  public makeRed(): void {
    this.selectedProduct.emit(this.product);
  }

  public removeItem(id: number):void {
    
  }
}
