import {Component, Input, OnInit, OnChanges } from '@angular/core';
import {AppDocument} from '../../document/shared/model/document.model';
import { DocumentService } from '../../document/shared/service/document.service';
import { User } from '../../user/shared/model/user.model';
import { AppStoreService } from '../../shared/service/app.store.service';
import { combineLatest } from 'rxjs';
import { UserSaveAction } from '../../user/shared/user.actions';
import { UserService } from '../../user/shared/service/user.service';
import { ADMIN_PERMISSIONS, USER_PERMISSIONS, CLOSED_FEATURE_PERMISSIONS, ADMIN_AND_SOURCER_PERMISSIONS } from 'src/app/permissions/model/app.permissions.model';
import { Store } from "@ngrx/store";
import {AppState} from "../../shared/app.state";
import { DocumentCollectionTypes } from '../../document/shared/document-collection-types';
import { AppCollection } from 'src/app/app-collection/shared/model/app-collection.model';
import { AppCollectionService } from 'src/app/app-collection/shared/service/app-collection.service';
import { ConfidentialityTypes } from 'src/app/permissions/model/confidentiality-types';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnChanges {
  DocumentCollectionTypes = DocumentCollectionTypes;
  CLOSED_FEATURE_PERMISSIONS = CLOSED_FEATURE_PERMISSIONS;
  USER_PERMISSIONS = USER_PERMISSIONS;
  ConfidentialityTypes = ConfidentialityTypes;
  @Input() toolBarOpenClicked: boolean;
  @Input() drawer;
  user: User;
  ADMIN_PERMISSIONS = ADMIN_PERMISSIONS;
  ADMIN_AND_SOURCER_PERMISSIONS=ADMIN_AND_SOURCER_PERMISSIONS;
  collections: AppCollection[];
  
  publicTutosLight: AppDocument[] = [];
  myTutosLight: AppDocument[] = [];

  myTutoChevronUp = false;
  publicChevronUp = false;

  constructor(private documentService: DocumentService,
              private store: Store<AppState>,
              private appStoreService: AppStoreService,
              private userService: UserService,
              private appCollectionService: AppCollectionService,
              ) { }

  ngOnInit() {
    this.loadTutosLight();

    combineLatest(
      this.appStoreService.getUser(),
      this.appStoreService.getPrincipal()).subscribe(([userInStore, principal]) => {
        if (!userInStore) {
          if (principal) {
            this.userService.findByUsername(principal.username).subscribe(
              user => {
                this.user = user;
                this.store.dispatch(new UserSaveAction(user));
              }, error => {
                this.appStoreService.addErrorNotif(error.status, error.message);
              }
            );
          }
        } else {
          this.user = userInStore;
        }
    });

    this.loadCollections();
  }

  private loadCollections(){
    this.appStoreService.startLoading();
    this.appCollectionService.findAll()
    .subscribe(
      collections => {
        this.collections = collections;
        this.appStoreService.stopLoading();
      }, _error => {
        this.appStoreService.stopLoading();
      }
    );
  }

  loadPublicTutosLight(){
    const collectionType= DocumentCollectionTypes.PUBLIC_TUTOS;
    this.documentService.getTutoslight(collectionType).subscribe(tutos => {
      this.publicTutosLight = tutos;
    }, () => {},
      () => {
        this.appStoreService.stopLoading();
      });
  }

  loadMyTutosLight(){
    const collectionType= DocumentCollectionTypes.MY_TUTOS;
    this.documentService.getTutoslight(collectionType).subscribe(tutos => {
      this.myTutosLight = tutos;
    }, () => {},
      () => {
        this.appStoreService.stopLoading();
      });
  }

  loadTutosLight() {
    this.loadPublicTutosLight();
    this.loadMyTutosLight();
  }

  ngOnChanges(changes: any) {
    if (changes && changes.toolBarOpenClicked) {
      this.loadTutosLight();
    }
  }
}
