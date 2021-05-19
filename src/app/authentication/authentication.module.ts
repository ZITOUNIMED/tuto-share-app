import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {AuthenticationGuardService} from './authentication-guard.service';
import {ReactiveFormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import {AuthService} from './shared/service/auth.service';
import { HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {AppDirectivesModule} from '../directive/app-directives.module';

@NgModule({
  imports: [ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    CommonModule,
    AppDirectivesModule
  ],
  declarations: [LoginComponent, SignupComponent],
  providers: [
    AuthenticationGuardService,
    AuthService,
  ]
})
export class AuthenticationModule {}
