import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  public products:Product[];
  
  constructor(public http: HttpClient) {
    this.getproductsFromDB().subscribe(
      res => {
        this.products = res.data;
      },
      err => {
        throw err;
      }
    );
  }

  public getproductsFromDB(): Observable<any> {
    return this.http.get('./assets/json/data.json');
  }
}
