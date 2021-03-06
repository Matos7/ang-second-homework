import _ from 'lodash';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Product } from '../../core/models/product';
import { DataService } from '../../core/services/data.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  public products: Product[] = [];
  public cachedProducts: Product[] = [];

  public searchText: string;
  public sortValue: string;

  public selectedProduct: Product;

  public editingProduct: Product | {};

  public isLoading: boolean = true;

  public editingValidationErrors: boolean = false;
  public addingValidationErrors: boolean = false;

  public error: string;

  public editItemForm: FormGroup;
  public addItemForm: FormGroup;
  public categoryForm: FormGroup;
  public priceForm: FormGroup;

  public rangeValue: number = 350;

  constructor(
    public dataService: DataService,
    private fb: FormBuilder,
    public _router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(this.getProducts.bind(this), 200);
    this.createValidationForAdding();
    this.categoryForm = new FormGroup({
      findCategory: new FormControl(),
    });
    this.priceForm = new FormGroup({
      priceRange: new FormControl(),
    });
  }

  public findByCategory(): void {
    const formGroup = this.categoryForm.controls;
    let selectedValue: string = formGroup.findCategory.value;

    this._router.navigateByUrl(`/home?category=${selectedValue}`);

    this.products = this.cachedProducts.filter(
      (item) => item.category === selectedValue
    );
  }

  public findUntilPrice(): void {
    const formGroup = this.priceForm.controls;
    let selectedValue: number = formGroup.priceRange.value;

    this.rangeValue = selectedValue;

    this._router.navigateByUrl(`/home?price=${selectedValue}`);

    this.products = this.cachedProducts
      .filter((item) => item.price <= selectedValue)
      .sort((a: Product, b: Product) => b.price - a.price);
  }

  public createValidationForAdding(): void {
    this.addItemForm = this.fb.group({
      addTitle: new FormControl('', [Validators.required]),
      addDesc: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(150),
      ]),
      addPrice: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      addCategory: new FormControl('', [Validators.required]),
      addImgUrl: new FormControl('', [Validators.required]),
    });
  }

  public getProducts(): void {
    this.dataService.getproductsFromDB().subscribe(
      (res) => {
        this.products = this.cachedProducts = res.data;
      },
      (err) => {
        throw err;
      }
    );
    this.isLoading = false;
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
    this.editItemForm = this.fb.group({
      editTitle: new FormControl(product.title, [Validators.required]),
      editDesc: new FormControl(product.description, [
        Validators.required,
        ,
        Validators.minLength(10),
        Validators.maxLength(150),
      ]),
      editPrice: new FormControl(product.price, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      editImgUrl: new FormControl(product.imageUrl, [Validators.required]),
    });

    this.editingProduct = product;
  }

  public removeProduct(product: Product): void {
    this.searchText = '';
    this.sortValue = '';
    const removingId = product.id;

    if (this.editingProduct === product) {
      this.editingProduct = {};
    }

    this.products = _.remove(this.products, function(item) {
      return item.id !== removingId;
    });
    
    this.cachedProducts = _.remove(this.cachedProducts, function(item) {
      return item.id !== removingId;
    });
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
      this.products = this.cachedProducts.filter((product) =>
        product.title.toLocaleLowerCase().includes(modifiedVal)
      );

      this.isLoading = false;
    }, 200);
  }

  public editItem(id: number): void {
    this.editingValidationErrors = false;
    this.isLoading = true;

    const formGroup = this.editItemForm.controls;

    let title: string = formGroup.editTitle.value;
    let description: string = formGroup.editDesc.value;
    let price: number = formGroup.editPrice.value;
    let imgUrl: string = formGroup.editImgUrl.value;

    setTimeout(() => {
      const index = this.products.findIndex((item) => item.id === id);
      const product = this.products[index];

      product.title = title;
      product.description = description;
      product.price = price;
      product.imageUrl = imgUrl;

      this.isLoading = false;
    }, 200);
  }

  public goAddItem(): void {
    this.editingProduct = {};
  }

  public addItem(): void {
    this.addingValidationErrors = false;
    this.isLoading = true;

    const formGroup = this.addItemForm.controls;

    let title: string = formGroup.addTitle.value;
    let description: string = formGroup.addDesc.value;
    let category: string = formGroup.addCategory.value;
    let price: number = formGroup.addPrice.value;
    let imgUrl: string = formGroup.addImgUrl.value;

    setTimeout(() => {
      const newId = this.products.length + 1;

      const newProduct: Product = {
        id: newId,
        title: title,
        description: description,
        category: category,
        price: price,
        imageUrl: imgUrl,
      };

      this.products.push(newProduct);

      title = '';
      description = '';
      price = null;
      imgUrl = '';
      this.isLoading = false;
    }, 200);
  }
}
