import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SignInRequest} from '../shared/model/signin.request.model';
import {AuthService} from '../shared/service/auth.service';
import {Store} from '@ngrx/store';
import {PrincipalSaveAction} from '../shared/principal.actions';
import {CRIPTED_PASSWAORD_KEY, Principal, USERNAME_KEY} from '../shared/model/principal.model';
import {Router} from '@angular/router';
import {AppState} from '../../shared/app.state';
import {AppStoreService} from '../../shared/service/app.store.service';
import {AppLocalStorageService} from '../../shared/service/app-local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  principal: Principal;

  loginForm: FormGroup;
  fb = new FormBuilder();

  constructor(private authService: AuthService,
              private store: Store<AppState>,
              private router: Router,
              private appStoreService: AppStoreService,
              private appLocalStorageService: AppLocalStorageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [],
    });

    this.store.select('principalState').subscribe(state => {
      if (state && state.principal && state.principal.token) {
        this.router.navigate(['/home']);
      }
    });
  }

  login() {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      const rememberMe = this.loginForm.get('rememberMe').value;

      this.appStoreService.startLoading();
      this.authService.signIn(username, password).subscribe(res => {
        if (rememberMe) {
          this.appLocalStorageService.put(USERNAME_KEY, username);
          this.appLocalStorageService.put(CRIPTED_PASSWAORD_KEY, password);
        }
        this.appStoreService.stopLoading();
        this.store.dispatch(new PrincipalSaveAction(res));
      }, error => {
        this.appStoreService.addErrorNotif(error.status, 
          `${error.error.status} ${error.error.error}: ${error.error.message}`);
        this.appStoreService.stopLoading();
      });
  }

}
