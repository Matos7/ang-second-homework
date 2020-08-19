import { User } from './../../core/models/users';
import { UsersService } from './../../core/services/users.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public signUp: FormGroup;
  public _subscription: Subscription;
  public users: User[];

  public existEmail: boolean = false;
  public existPhone: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private _router: Router
  ) {
    this.signUp = this.fb.group(
      {
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('', [Validators.required]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?.[a-zA-Z]{2,3}')
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16)
        ]),
        confirmPassword: new FormControl(''),
        city: new FormControl(''),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ])
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

  public registerUser(): void {
    const formGroup = this.signUp.controls;

    let name: string = formGroup.name.value;
    let surname: string = formGroup.surname.value;
    let email: string = formGroup.email.value;
    let password: string = formGroup.password.value;
    let city: string = formGroup.city.value;
    let phone: number = formGroup.phone.value;

    const findUserWithEmail: User = this.usersService.users.find(
      item => item.email === email
    );
    const findUserWithPhone: User = this.usersService.users.find(
      item => item.phone === phone
    );

    if (findUserWithEmail === undefined && findUserWithPhone === undefined) {
      const newId = this.usersService.users.length + 1;

      const newUser: User = {
        id: newId,
        name: name,
        surname: surname,
        email: email,
        password: password,
        city: city,
        phone: phone
      };

      this.usersService.users.push(newUser);

      this._router.navigateByUrl('/login');
    } else {
      if (findUserWithEmail) {
        this.existEmail = true;
        setTimeout(() => {
          this.existEmail = false;
        }, 5000);
      }
      if (findUserWithPhone) {
        this.existPhone = true;
        setTimeout(() => {
          this.existPhone = false;
        }, 5000);
      }
    }
  }

  ngOnInit(): void {
    this._subscription = this.signUp.valueChanges.subscribe(res => {
      // console.log('res', res);
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
