import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {SignInRequest} from '../model/signin.request.model';
import {SignUpRequest} from '../model/signup.request.model';
import {Principal} from '../model/principal.model';
import {RegistrationRule} from '../model/registration-rule.model';

@Injectable()
export class AuthService {
  private authUrl = environment.base + environment.auth;
  constructor(private http: HttpClient) {}

  signIn(username: string, password: string): Observable<Principal> {
    const signInRequest: SignInRequest = {
      username: username,
      password: password
    };
    return this.http.post<Principal>(this.authUrl + '/signin', signInRequest);
  }

  signUp(request: SignUpRequest): Observable<any> {
    return this.http.post(this.authUrl + '/signup', request);
  }

  getRegistrationRules(): Observable<RegistrationRule[]> {
    return this.http.get<RegistrationRule[]>(this.authUrl + '/registration-rules');
  }
}
