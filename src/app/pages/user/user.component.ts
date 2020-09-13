import { UsersService } from './../../core/services/users.service';
import { User } from './../../core/models/users';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  // For seeing all users data
  public users: User[];

  public userID: number = parseInt(localStorage.getItem('userID'));
  public user: User;
  public isLoading: boolean = true;

  public showUpdateComponent: boolean = false;

  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getUsers();
    }, 200);
  }

  getUsers(): void {
    this.usersService.getUsersFromDB().subscribe(
      (res) => {
        this.users = res.users;
        this.user = this.users.find((item) => item.id === this.userID);
      },
      (err) => {
        throw err;
      }
    );
    this.isLoading = false;
  }

  toggleComponent(): void {
    this.showUpdateComponent === true ? this.showUpdateComponent = false : this.showUpdateComponent = true;
  }
}
