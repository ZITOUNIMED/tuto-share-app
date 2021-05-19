import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/service/user.service';
import { User } from './shared/model/user.model';
import { CreateUpdateUserComponent } from './shared/modal/create-update-user/create-update-user.component';
import { MatDialog } from '@angular/material';
import { RoleNameTypes } from './shared/model/role-name-types.enum';
import { GenerecDialogComponent } from '../generec-dialog/generec-dialog.component';
import {AppStoreService} from '../shared/service/app.store.service';
import { AppCollectionService } from '../app-collection/shared/service/app-collection.service';
import { AppCollection } from '../app-collection/shared/model/app-collection.model';
import { AddMemberToCollectionComponent } from './shared/modal/add-member-to-collection/add-member-to-collection.component';
import { AppSnackbarService } from '../shared/app-snackbar.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  RoleNameTypes = RoleNameTypes;
  collections: AppCollection[];
  constructor(private userService: UserService,
              public dialog: MatDialog,
              private appStoreService: AppStoreService,
              private appSnackbarService: AppSnackbarService,
              private appCollectionService: AppCollectionService,) { }

  ngOnInit() {
    this.loadUsers();
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

  addMemberToCollection(user){
    const dialogRef = this.dialog.open(AddMemberToCollectionComponent, {
      data: {
        member: user,
        collections: this.collections
      }
    });

    dialogRef.afterClosed().subscribe((collection: AppCollection) => {
      if (collection) {
        this.appStoreService.startLoading();
        if(!collection.members){
          collection.members = [];
        }
        collection.members.push(user);
        this.appCollectionService.save(collection)
        .subscribe(_res => {
          this.appStoreService.stopLoading();
          this.appSnackbarService.openSnackBar('SUCCESS: member was added to collection', 'ADD');
        }, error => {
          this.appStoreService.stopLoading();
          this.appStoreService.addErrorNotif(error.status, error.message);
        })
      }
    });
  }

  loadUsers() {
    this.appStoreService.startLoading();
    this.userService.getAllUsers()
      .subscribe(users => {
        this.users = users;
      },
        () => { },
        () => {
          this.appStoreService.stopLoading();
        });
  }

  openCreateUpdateUser(user: User) {
    const dialogRef = this.dialog.open(CreateUpdateUserComponent, {
      data: {
        user: user
      }
    });
    dialogRef.afterClosed().subscribe((user: User) => {
      if (user) {
        this.saveUser(user);
      }
    });
  }

  openDeleteUser(user: User) {
    const dialogRef = this.dialog.open(GenerecDialogComponent, {
      width: '350px',
      data: { title: 'Delete User', message: 'Do you want to delete the user: ' + user.username + ' ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(user.id);
      }
    });
  }

  saveUser(user: User) {
    this.appStoreService.startLoading();
    this.userService.saveUser(user)
      .subscribe((res: any) => {
        this.appStoreService.stopLoading();
        this.loadUsers();
      },
        () => {
          this.appStoreService.stopLoading();
        });
  }

  deleteUser(id: number) {
    this.appStoreService.startLoading();
    this.userService.deleteUser(id)
      .subscribe((res: any) => {
          this.appStoreService.stopLoading();
        this.loadUsers();
      },
        () => {
          this.appStoreService.stopLoading();
        });
  }
}
