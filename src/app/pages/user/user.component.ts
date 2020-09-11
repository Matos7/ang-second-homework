import { User } from './../../core/models/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user:User = JSON.parse(localStorage.getItem('user'));

  constructor() { }

  ngOnInit(): void {
    console.log("this.user",this.user);
  }

}
