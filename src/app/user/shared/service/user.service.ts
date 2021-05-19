import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.base + environment.api + '/user';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  saveUser(user: User): Observable<any> {
    return this.http.post(this.url, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.url + `/${id}`);
  }

  findByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.url + `/by-username/${username}`);
  }
}
