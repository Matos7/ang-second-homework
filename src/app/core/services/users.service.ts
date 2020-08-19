import { User } from './../models/users';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {
  public users:User[];
  
  constructor(public http: HttpClient) {
    this.getUsersFromDB().subscribe(
      res => {
        this.users = res.users;
      },
      err => {
        throw err;
      }
    );
  }

  public getUsersFromDB(): Observable<any> {
    return this.http.get('./assets/json/data.json');
  }

}
