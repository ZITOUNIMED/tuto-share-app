import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppCollection } from '../shared/model/app-collection.model';
import { CreateUpdateCollectionComponent } from '../shared/modal/create-update-collection/create-update-collection.component';
import { MatDialog } from '@angular/material';
import { AppSnackbarService } from 'src/app/shared/app-snackbar.service';
import { AppStoreService } from 'src/app/shared/service/app.store.service';
import { AppCollectionService } from '../shared/service/app-collection.service';
import { GenerecDialogComponent } from 'src/app/generec-dialog/generec-dialog.component';

@Component({
  selector: 'app-collection-list',
  templateUrl: './app-collection-list.component.html',
  styleUrls: ['./app-collection-list.component.css']
})
export class AppCollectionListComponent implements OnInit {
  @Input() collections: AppCollection[];
  @Output() reloadChanged = new EventEmitter<boolean>();
  constructor(public dialog: MatDialog,
          private appSnackbarService: AppSnackbarService,
          private appCollectionService: AppCollectionService,
          private appStoreService: AppStoreService,) { }

  ngOnInit() {
  }

  openDialogDeleteCollection(collection: AppCollection) {
    const dialogRef = this.dialog.open(GenerecDialogComponent, {
      width: '350px',
      data: {title: 'Delete Document', message: 'Do you want to delete the collection: ' + collection.name + ' ?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCollection(collection.id);
      }
    });
  }

  deleteCollection(id: number){
    this.appCollectionService.deleteCollection(id)
    .subscribe(res => {
      this.appSnackbarService.openSnackBar('Success!: Collection Deleted', 'delete');
      this.reloadChanged.emit(true);
    });
  }

  openDialogCreateUpdateCollection(collection: AppCollection) {
    const dialogRef = this.dialog.open(CreateUpdateCollectionComponent, {
      data: {
        collection: collection
      }
    });
    dialogRef.afterClosed().subscribe((newCollection: AppCollection) => {
      if (newCollection) {
        newCollection.id = collection.id;
        newCollection.ownerUsername = collection.ownerUsername;
        this.saveCollection(newCollection);
      }
    });
  }

  private saveCollection(collection: AppCollection) {
    this.appStoreService.startLoading();
    this.appCollectionService.save(collection).subscribe(
      res => {
        this.appStoreService.stopLoading();
        this.appSnackbarService.openSnackBar('Success!: Collection is saved', 'SAVE');
        this.reloadChanged.emit(true);
      },
      error => {
        this.appStoreService.stopLoading();
        this.appStoreService.addErrorNotif(error.status, error.message);
      }
    );
  }
}
