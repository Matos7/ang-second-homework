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
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  public users: User[];
  public forgetForm: FormGroup;
  public _subscription: Subscription;
  public wrongEmail: boolean = false;
  public wrongPhone: boolean = false;
  public isLoading: boolean = false;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private _router: Router
  ) {
    this.forgetForm = this.fb.group(
      {
        login: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?.[a-zA-Z]{2,3}')
        ]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16)
        ]),
        confirmPassword: new FormControl('')
      },
      {
        validators: this.ConfirmedValidator('password', 'confirmPassword')
      }
    );
  }

  public ConfirmedValidator(
    controlName: string,
    matchingControlName: string
  ): Function {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  ngOnInit(): void {
    this._subscription = this.forgetForm.valueChanges.subscribe(res => {
      // console.log('res', res);
    });
    this.usersService.getUsersFromDB().subscribe((res)=>{
      this.users = res.users
    },(err)=>{
      console.log(err);
    })
  }

  public changePass(): void {
    this.isLoading = true;
    this.wrongEmail = false;
    this.wrongPhone = false;

    setTimeout(() => {
      const formGroup = this.forgetForm.controls;

      let login: string = formGroup.login.value;
      let phone: number = formGroup.phone.value;
      let password: string = formGroup.password.value;

      const item: User = this.users.find(item => item.email === login);

      if (item === undefined) {
        this.wrongEmail = true;
        setTimeout(() => {
          this.wrongEmail = false;
        }, 5000);
      } else {
        if (item.phone === phone) {
          item.password = password;
          const index:number = this.users.findIndex(item => item.email === login);
          this.users[index].password = password;
          this._router.navigateByUrl('/login');
        } else {
          this.wrongPhone = true;
          setTimeout(() => {
            this.wrongPhone = false;
          }, 5000);
        }
      }
      this.isLoading = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
