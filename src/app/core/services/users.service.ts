import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {  
  constructor(public http: HttpClient) {
  }

  public getUsersFromDB(): Observable<any> {
    return this.http.get('./assets/json/data.json');
  }

}
