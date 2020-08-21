import { ForgetPasswordModule } from './pages/forget-password/forget-password.module';
import { RegisterModule } from './pages/register/register.module';
import { LoginModule } from './pages/login/login.module';
import { HomeModule } from './pages/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './components/root/app.component';
import { HeaderComponent } from './components/header/header.component';
import { CoreModule } from './core/core.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    HomeModule,
    LoginModule,
    RegisterModule,
    ForgetPasswordModule,
    BrowserModule,
    FormsModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
