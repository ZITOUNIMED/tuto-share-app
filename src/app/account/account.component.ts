import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/shared/service/user.service';
import {User} from '../user/shared/model/user.model';
import {Store} from '@ngrx/store';
import { AppStoreService } from '../shared/service/app.store.service';
import { UserSaveAction } from '../user/shared/user.actions';
import {AppState} from '../shared/app.state';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  editMode=false;
  user: User;

  constructor(private userService: UserService,
              private store: Store<AppState>,
              private appStoreService: AppStoreService) { }

  ngOnInit() {
    this.store.select('principalState').subscribe(state => {
      if (state && state.principal && state.principal.username) {
        this.loadUser(state.principal.username);
      }
    });
  }

  loadUser(username: string) {
    this.appStoreService.startLoading();
    this.userService.findByUsername(username)
      .subscribe(user => {
        this.user = user;
        this.store.dispatch(new UserSaveAction(user));
      }, error => {
        this.appStoreService.addErrorNotif(error.status, error.message);
      }, () => {
        this.appStoreService.stopLoading();
      });
  }

}
