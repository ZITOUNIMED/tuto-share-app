import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors} from '@angular/forms';
import {AuthService} from '../shared/service/auth.service';
import {SignUpRequest} from '../shared/model/signup.request.model';
import {NotificationsState} from '../../shared/notification/notifications.state';
import {Store} from '@ngrx/store';
import {NotificationsAddAction} from '../../shared/notification/notifications.actions';
import {NotificationTypes} from '../../shared/notification/notification.model';
import {RegistrationRule} from '../shared/model/registration-rule.model';
import {AppStoreService} from '../../shared/service/app.store.service';
import { oc } from 'src/app/shared/app-utils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  rules: RegistrationRule[];
  fb = new FormBuilder();

  constructor(private authService: AuthService,
              private store: Store<NotificationsState>,
              private appStoreService: AppStoreService) {
  }

  ngOnInit() {

    const passwordConfirmValidator = (control: AbstractControl) => {
      let errors: ValidationErrors = null;
      if(this.signupForm && this.password && control && this.password.value !== control.value){
        errors = {
          passwordConfirm: true
        };
      }
      return errors;
    };

    const passwordValidator = (control: AbstractControl) => {
      let errors: ValidationErrors = null;
      if(this.signupForm && control){
        const value = control.value;
        if(!new RegExp("(?=.*[a-z])").test(value)){
          errors = {
            ...errors,
            lowercase: true
          };
        }
        if(!new RegExp("(?=.*[A-Z])").test(value)){
          errors = {
            ...errors,
            uppercase: true
          };
        }
        if(!new RegExp("(?=.*[0-9])").test(value)){
          errors = {
            ...errors,
            digitNumber: true
          };
        }
        if(!new RegExp("(?=.*[@#$%^&+=])").test(value)){
          errors = {
            ...errors,
            specialCharacter: true
          };
        }
        if(!new RegExp(".{10,}").test(value)){
          errors = {
            ...errors,
            minlength: true
          };
        }
        if(!new RegExp("(?=\\S+$)").test(value)){
          errors = {
            ...errors,
            noWhiteSpace: true
          };
        }
      }
      return errors;
    };

    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: [''],
      username: ['', Validators.required],
      password: ['', [Validators.required, passwordValidator]],
      passwordConfirm: ['', [Validators.required, passwordConfirmValidator]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.authService.getRegistrationRules().subscribe(rules => {
      this.rules = rules || [];
    });
  }

  get email() {
    return oc(this.signupForm.get('email'));
  }

  get passwordConfirm() {
    return oc(this.signupForm.get('passwordConfirm'));
  }

  get firstname() {
    return oc(this.signupForm.get('firstname'));
  }

  get username() {
    return oc(this.signupForm.get('username'));
  }

  get password() {
    return oc(this.signupForm.get('password'));
  }

  signup() {
    const firstname = this.signupForm.get('firstname').value;
    const lastname = this.signupForm.get('lastname').value;
    const username = this.signupForm.get('username').value;
    const password = this.signupForm.get('password').value;
    const passwordConfirm = this.signupForm.get('passwordConfirm').value;
    const email = this.signupForm.get('email').value;

    const request: SignUpRequest = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      passwordConfirm: passwordConfirm,
      email: email
    };

    this.appStoreService.startLoading();

    this.authService.signUp(request).subscribe(
      res => {
        this.appStoreService.stopLoading();
        this.store.dispatch(new NotificationsAddAction({
          code: null,
          type: NotificationTypes.SUCCESS,
          message: 'User has been registred with success'
        }));
        this.signupForm.reset();
      },
      error => {
        this.appStoreService.stopLoading();
        this.appStoreService.addErrorNotif(error.status, error.error);
      });
  }
}
