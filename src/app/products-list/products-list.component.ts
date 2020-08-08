import { Product } from './../core/models/product';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  public products: Product[] = [];
  public cachedProducts: Product[] = [];

  public searchText: string;

  public sortValue: string;

  public selectedProduct: Product;

  constructor() {}

  ngOnInit(): void {
    this.products = this.cachedProducts = [
      new Product(
        1,
        'Nike',
        'This is a for Nike',
        250,
        'https://pngimg.com/uploads/nike/nike_PNG18.png'
      ),
      new Product(
        2,
        'Adidas',
        'This is a for Adidas',
        220,
        'https://seeklogo.net/wp-content/uploads/2013/12/adidas-black-vector-logo-400x400.png'
      ),
      new Product(
        3,
        'Reebok',
        'This is a for Reebok',
        280,
        'https://www.clickpoland.com/wp-content/uploads/2019/04/reebok-vector-logo-400x400.png'
      ),
      new Product(
        4,
        "Puma",
        "This is a description for Puma",
        240,
        "data:image/png;base64,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"
      )
    ];
  }

  public getSelectedProduct(product: Product): void {
    this.selectedProduct = product;
  }

  public removeProduct(product: Product): void {
    this.searchText = '';
    this.sortValue = '';
    const removingId = product.id;
    this.products = this.cachedProducts.filter(item => removingId !== item.id);
    this.cachedProducts = this.products;
  }

  public sortProducts(selectedValue: string): void {
    switch (selectedValue) {
      case 'a-z':
        this.products = this.cachedProducts.sort((a:Product, b:Product) =>  {
          let aItem:string = a.title.toLowerCase();
          let bItem:string = b.title.toLowerCase();

          return aItem < bItem ? -1 : aItem > bItem ? 1 : 0;
        });
        break;
      case 'z-a':
        this.products = this.cachedProducts.sort((a:Product, b:Product) => {
          let aItem:string = a.title.toLowerCase();
          let bItem:string = b.title.toLowerCase();

          return aItem < bItem ? 1 : aItem > bItem ? -1 : 0;
        });
        break;
      case 'high-low':
        this.products = this.cachedProducts.sort((a:Product, b:Product) => b.price - a.price);
        break;
      case 'low-high':
        this.products = this.cachedProducts.sort((a:Product, b:Product) =>  a.price - b.price);
        break;
    }
  }

  public isSelectedProduct(product: Product): boolean {
    if (
      product &&
      this.selectedProduct &&
      product.id === this.selectedProduct.id
    ) {
      return true;
    }
    return false;
  }

  public searchProduct(searchValue: string): void {
    this.searchText = searchValue;

    const modifiedVal: string = searchValue.trim().toLocaleLowerCase();

    this.products = this.cachedProducts.filter(product =>
      product.title.toLocaleLowerCase().includes(modifiedVal)
    );
  }
}
