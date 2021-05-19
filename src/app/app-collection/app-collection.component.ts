import { Component, OnInit } from '@angular/core';
import { AppCollection } from './shared/model/app-collection.model';
import { CreateUpdateCollectionComponent } from './shared/modal/create-update-collection/create-update-collection.component';
import { MatDialog } from '@angular/material';
import { AppCollectionService } from './shared/service/app-collection.service';
import { AppStoreService } from '../shared/service/app.store.service';
import { AppSnackbarService } from '../shared/app-snackbar.service';
import { oc } from '../shared/app-utils';
import { User } from '../user/shared/model/user.model';

@Component({
  selector: 'app-collection',
  templateUrl: './app-collection.component.html',
  styleUrls: ['./app-collection.component.css']
})
export class AppCollectionComponent implements OnInit {
  collections: AppCollection[] = [];
  user: User;
  constructor(public dialog: MatDialog,
            private appCollectionService: AppCollectionService,
            private appStoreService: AppStoreService,
            private appSnackbarService: AppSnackbarService) { }

  ngOnInit() {
    this.loadCollections();
    this.appStoreService.getUser()
    .subscribe(user => (this.user = user));
  }

  openCreateCollectionDialog() {
    const dialogRef = this.dialog.open(CreateUpdateCollectionComponent);
    dialogRef.afterClosed().subscribe((collection: AppCollection) => {
      if (collection) {
        this.saveNewCollection(collection);
      }
    });
  }

  saveNewCollection(collection: AppCollection){
    if (oc(this.user).username) {
      collection.ownerUsername = this.user.username;
      this.saveCollection(collection);
    } else {
      this.appSnackbarService.openSnackBar('INDEFINED!: Username is not defined', 'ADD');
    }
  }

  saveCollection(collection: AppCollection){
    this.appStoreService.startLoading();
    this.appCollectionService.save(collection)
    .subscribe(
      _res => {
        this.appStoreService.stopLoading();
        this.appSnackbarService.openSnackBar('SUCCESS: collection added!', 'LOAD');
        this.loadCollections();
      },
     _error => {
      this.appStoreService.stopLoading();
      this.appSnackbarService.openSnackBar('ERROR: error was occured while creating collection', 'LOAD');
    });
  }

  private loadCollections(){
    this.appStoreService.startLoading();
    this.appCollectionService.findAll()
    .subscribe(
      collection => {
        this.collections = collection;
        this.appStoreService.stopLoading();
        this.appSnackbarService.openSnackBar('SUCCESS: collections are loaded!', 'LOAD');
      },
     _error => {
       this.appStoreService.stopLoading();
       this.appSnackbarService.openSnackBar('ERROR: error was occured while loading collections', 'LOAD');
     });
  }

  onReloadCollection(reload) {
    if(reload){
      this.loadCollections();
    }
  }

}
