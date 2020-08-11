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
  @Output()
  public removingProduct: EventEmitter<any> = new EventEmitter();
  @Output()
  public editingProduct: EventEmitter<any> = new EventEmitter();

  constructor() {}

  public makeRed(): void {
    this.selectedProduct.emit(this.product);
  }

  public removeItem(): void {
    this.removingProduct.emit(this.product);
  }

  public editItem(): void {
    this.editingProduct.emit(this.product);
  }
}
