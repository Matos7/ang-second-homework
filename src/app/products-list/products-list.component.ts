import { DataService } from './../core/services/data.service';
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

  public editTitle: string;
  public editDesc: string;
  public editPrice: number;
  public editImgUrl: string;

  public addTitle: string;
  public addDesc: string;
  public addPrice: number;
  public addImgUrl: string;

  public selectedProduct: Product;

  public editingProduct: Product | {};

  public isLoading: boolean = true;

  public editingValidationErrors: boolean = false;
  public addingValidationErrors: boolean = false;

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    setTimeout(this.getProducts.bind(this), 200);
  }

  public getProducts(): void {
    this.dataService.getProductsFromDB().subscribe(
      res => {
        this.cachedProducts = this.products = res.data;
        this.isLoading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  public isEmptyObject(obj: Product | {}): boolean {
    if (obj === undefined) {
      return true;
    }
    return Object.keys(obj).length === 0 ? true : false;
  }

  public getSelectedProduct(product: Product): void {
    this.selectedProduct = product;
  }

  public getEditableProduct(product: Product): void {
    this.editTitle = product.title;
    this.editPrice = product.price;
    this.editDesc = product.description;
    this.editImgUrl = product.imageUrl;
    this.editingProduct = product;
  }

  public removeProduct(product: Product): void {
    this.searchText = '';
    this.sortValue = '';
    const removingId = product.id;
    this.products = this.cachedProducts.filter(item => removingId !== item.id);
    this.cachedProducts = this.products;
    if (this.editingProduct === product) {
      this.editingProduct = {};
    }
  }

  public sortProducts(selectedValue: string): void {
    this.isLoading = true;
    setTimeout(() => {
      switch (selectedValue) {
        case 'a-z':
          this.products = this.cachedProducts.sort((a: Product, b: Product) => {
            let aItem: string = a.title.toLowerCase();
            let bItem: string = b.title.toLowerCase();

            return aItem < bItem ? -1 : aItem > bItem ? 1 : 0;
          });
          break;
        case 'z-a':
          this.products = this.cachedProducts.sort((a: Product, b: Product) => {
            let aItem: string = a.title.toLowerCase();
            let bItem: string = b.title.toLowerCase();

            return aItem < bItem ? 1 : aItem > bItem ? -1 : 0;
          });
          break;
        case 'high-low':
          this.products = this.cachedProducts.sort(
            (a: Product, b: Product) => b.price - a.price
          );
          break;
        case 'low-high':
          this.products = this.cachedProducts.sort(
            (a: Product, b: Product) => a.price - b.price
          );
          break;
      }

      this.isLoading = false;
    }, 200);
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
    this.isLoading = true;
    this.searchText = searchValue;

    const modifiedVal: string = searchValue.trim().toLocaleLowerCase();

    setTimeout(() => {
      this.products = this.cachedProducts.filter(product =>
        product.title.toLocaleLowerCase().includes(modifiedVal)
      );

      this.isLoading = false;
    }, 200);
  }

  public editItem(id: number): void {
    const isValid =
      this.editTitle &&
      this.editDesc &&
      Number.isInteger(this.editPrice) &&
      this.editImgUrl;

    if (isValid) {
      this.editingValidationErrors = false;
      this.isLoading = true;

      setTimeout(() => {
        const index = this.products.findIndex(item => item.id === id);
        const product = this.products[index];

        product.title = this.editTitle;
        product.price = this.editPrice;
        product.description = this.editDesc;
        product.imageUrl = this.editImgUrl;

        this.isLoading = false;
      }, 200);
    } else {
      this.editingValidationErrors = true;
    }
  }

  public goAddItem(): void {
    this.editingProduct = {};
  }

  public addItem(): void {
    const isValid =
      this.addTitle &&
      this.addDesc &&
      Number.isInteger(this.addPrice) &&
      this.addImgUrl;

    if (isValid) {
      this.addingValidationErrors = false;
      this.isLoading = true;

      setTimeout(() => {
        const newId = this.products.length + 1;

        const newProduct: Product = {
          id: newId,
          title: this.addTitle,
          description: this.addDesc,
          price: this.addPrice,
          imageUrl: this.addImgUrl
        };

        this.products.push(newProduct);
        this.cachedProducts.push(newProduct);

        this.addTitle = '';
        this.addDesc = '';
        this.addPrice = null;
        this.addImgUrl = '';
        this.isLoading = false;
      }, 200);
    } else {
      this.addingValidationErrors = true;
    }
  }
}
