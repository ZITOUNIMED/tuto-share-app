import { Component, OnInit } from '@angular/core';
import { AppLocalStorageService } from 'src/app/shared/service/app-local-storage.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/shared/app.state';
import { Store } from '@ngrx/store';
import { PrincipalCleanAction } from 'src/app/authentication/shared/principal.actions';
import { USERNAME_KEY, CRIPTED_PASSWAORD_KEY } from 'src/app/authentication/shared/model/principal.model';
import { AppStoreService } from 'src/app/shared/service/app.store.service';
import { User } from '../../user/shared/model/user.model';
import { RoleNameTypes } from 'src/app/user/shared/model/role-name-types.enum';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {
  user: User;
  isGuest= true;
  constructor(private appLocalStorageService: AppLocalStorageService,
              private store: Store<AppState>,
              private router: Router,
              private appStoreService: AppStoreService) { }

  ngOnInit() {
    this.appStoreService.getUser()
    .subscribe(user => {
      this.user = user;
      this.isGuest =  !user || user.roles.some(role => role.name === RoleNameTypes.ROLE_GUEST);
    });
  }

  signout() {
    this.appLocalStorageService.remove(USERNAME_KEY);
    this.appLocalStorageService.remove(CRIPTED_PASSWAORD_KEY);
    this.store.dispatch(new PrincipalCleanAction(true));
    this.router.navigateByUrl('/auth/login');
  }
}
