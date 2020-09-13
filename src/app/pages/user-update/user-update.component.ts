import { User } from './../../core/models/users';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  @Input()
  public user: User;

  public updateUser: FormGroup;

  constructor(private fb:FormBuilder) {}

  ngOnInit(): void {
    if(this.user){
      this.updateUser = this.fb.group({
        email: new FormControl(this.user.email, [
          Validators.required,
          Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?.[a-zA-Z]{2,3}'),
        ]),
        city: new FormControl(this.user.city),
        phone: new FormControl(this.user.phone, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      });
    }
  }

  updateUserSettings(): void {
    const email = this.updateUser.controls.email.value;
    const city = this.updateUser.controls.city.value;
    const phone = this.updateUser.controls.phone.value;

    this.user.email = email;
    this.user.phone = phone;
    this.user.city = city;
  }
}
