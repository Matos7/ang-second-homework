import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(public http: HttpClient) {
  }

  public getproductsFromDB(): Observable<any> {
    return this.http.get('./assets/json/data.json');
  }
}
