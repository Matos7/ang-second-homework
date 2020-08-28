import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ForgetPasswordComponent } from './forget-password.component';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ForgetPasswordComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ForgetPasswordRoutingModule,
    ReactiveFormsModule
  ]
})
export class ForgetPasswordModule { }
