import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  constructor(public http: HttpClient) {}

  public getProductsFromDB(): Observable<any> {
    return this.http.get('./assets/json/data.json');
  }
}
