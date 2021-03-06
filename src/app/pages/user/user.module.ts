import { UserUpdateModule } from './../user-update/user-update.module';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserComponent],
  imports: [
    UserUpdateModule,
    RouterModule,
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
