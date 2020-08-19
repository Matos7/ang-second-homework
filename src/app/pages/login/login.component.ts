import { Subscription } from 'rxjs';
import { User } from './../../core/models/users';
import { UsersService } from './../../core/services/users.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public users: User[];
  public loginForm: FormGroup;
  public _subscription: Subscription;
  public wrongEmail: boolean = false;
  public wrongPassword: boolean = false;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.loginForm = this.fb.group({
      login: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?.[a-zA-Z]{2,3}')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ])
    });
  }

  ngOnInit(): void {
    this._subscription = this.loginForm.valueChanges.subscribe(res => {
      // console.log('res', res);
    });
  }

  public login(): void {
    this.wrongEmail = false;
    this.wrongPassword = false;
    const formGroup = this.loginForm.controls;

    let login: string = formGroup.login.value;
    let password: string = formGroup.password.value;

    const item: User = this.usersService.users.find(item => item.email === login);

    if (item === undefined) {
      this.wrongEmail = true;
      setTimeout(() => {
        this.wrongEmail = false;
      }, 5000);
    } else {
      if (item.password === password) {
        this._router.navigateByUrl('/home');
      } else {
        this.wrongPassword = true;
        setTimeout(() => {
          this.wrongPassword = false;
        }, 5000);
      }
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
