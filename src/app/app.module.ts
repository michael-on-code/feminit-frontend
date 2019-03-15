import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { ProModule } from './pro/pro.module';
import { ConfirmComponent } from './confirm/confirm.component';

registerLocaleData(fr);

const appRoutes: Routes = [
  {
    path : 'login', component : LoginComponent
  },
  {
    path : 'signup', component : SignupComponent
  },
  {
    path : 'confirm/:userID/:activationCode', component : ConfirmComponent
  },
  {
    path : '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path : '**', redirectTo: 'login', pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    ProModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
