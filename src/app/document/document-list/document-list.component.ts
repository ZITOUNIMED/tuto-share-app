import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {DocumentService} from '../shared/service/document.service';
import {AppSnackbarService} from '../../shared/app-snackbar.service';
import {GenerecDialogComponent} from '../../generec-dialog/generec-dialog.component';
import {AppDocument} from '../shared/model/document.model';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';
import { CreateUpdateDocumentComponent } from '../shared/modal/create-update-document/create-update-document.component';
import { AppPermissions, ADMIN_AND_SOURCER_PERMISSIONS } from 'src/app/permissions/model/app.permissions.model';
import { AppTargetTypes } from 'src/app/permissions/model/app.target-types';
import { ConfidentialityTypes } from 'src/app/permissions/model/confidentiality-types';
import { oc } from 'src/app/shared/app-utils';
import { AddDocumentToCollectionComponent } from '../shared/modal/add-document-to-collection/add-document-to-collection.component';
import { AppCollection } from 'src/app/app-collection/shared/model/app-collection.model';
import { AppCollectionService } from 'src/app/app-collection/shared/service/app-collection.service';
import { AppStoreService } from 'src/app/shared/service/app.store.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Input() documents: AppDocument[] = [];
  @Output() reloadChanged = new EventEmitter<boolean>();
  searchDocumentControl: FormControl;
  filteredDocuments: Observable<AppDocument[]>;
  ConfidentialityTypes = ConfidentialityTypes;
  collections: AppCollection[];
  ADMIN_AND_SOURCER_PERMISSIONS = ADMIN_AND_SOURCER_PERMISSIONS;

  constructor(private documentService: DocumentService,
              private appSnackbarService: AppSnackbarService,
              private dialog: MatDialog,
              private router: Router,
              private appCollectionService: AppCollectionService,
              private appStoreService: AppStoreService,) {
  }

  ngOnInit() {
    this.searchDocumentControl = new FormControl();

    this.filteredDocuments = this.searchDocumentControl.valueChanges
      .pipe(
        startWith<string | AppDocument>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.documents.slice())
      );

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

  addDocumentToCollection(appDocument){
    const dialogRef = this.dialog.open(AddDocumentToCollectionComponent, {
      data: {
        appDocument: appDocument,
        collections: this.collections
      }
    });

    dialogRef.afterClosed().subscribe((collection: AppCollection) => {
      if (collection) {
        this.appStoreService.startLoading();
        if(!collection.documents){
          collection.documents = [];
        }
        collection.documents.push(appDocument);
        this.appCollectionService.save(collection)
        .subscribe(_res => {
          this.appStoreService.stopLoading();
          this.appSnackbarService.openSnackBar('SUCCESS: Document was added to collection', 'ADD');
        }, error => {
          this.appStoreService.stopLoading();
          this.appStoreService.addErrorNotif(error.status, error.message);
        })
      }
    });
  }

  private _filter(name: string) {
    const filterValue = name.toLocaleUpperCase();
    return this.documents.filter(document => document.name.toLocaleUpperCase().indexOf(filterValue) === 0);
  }

  onOpenDocument(document: AppDocument) {
    this.router.navigate(['/home', {outlets: { homeOutlet: `document/${document.id}`}}]);
  }

  openDialogDeleteDocument(document: AppDocument) {
    const dialogRef = this.dialog.open(GenerecDialogComponent, {
      width: '350px',
      data: {title: 'Delete Document', message: 'Do you want to delete the document: ' + document.name + ' ?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDocument(document.id);
      }
    });
  }

  openDialogCreateUpdateDocument(document: AppDocument) {
    const dialogRef = this.dialog.open(CreateUpdateDocumentComponent, {
      data: {
        doc: document
      }
    });
    dialogRef.afterClosed().subscribe((doc: AppDocument) => {
      if (doc) {
        doc.id = document.id;
        doc.elements = document.elements;
        doc.ownerUsername = document.ownerUsername;
        this.saveDocument(doc);
      }
    });
  }

  private saveDocument(document: AppDocument) {
    this.documentService.saveDocument(document).subscribe(
      res => {
        this.appSnackbarService.openSnackBar('Success!: Document is saved', 'SAVE');
        this.reloadChanged.emit(true);
      }
    );
  }

  deleteDocument(id: number) {
    this.documentService.deleteDocument(id)
      .subscribe(res => {
        this.appSnackbarService.openSnackBar('Success!: Document Deleted', 'delete');
        this.reloadChanged.emit(true);
      });
  }

  displayFn(document?: AppDocument): string | undefined {
    return document ? document.name : undefined;
  }

  getDocumentPermissions(document: AppDocument): AppPermissions {
    return {
      targetType: AppTargetTypes.DOCUMENT,
      confidentialities: [],
      targetObject: document,
    };
  }

  getDocPagesLab(doc){
    const pages = this.totalPages(doc);
    return !pages ? 'Empty' : pages === 1 ? 'One page' : pages + ' pages';
  }

  private totalPages(doc){
    if(!oc(doc.elements).length){
      return 0;
    }
    return doc.elements.sort((e1, e2) => e2.page - e1.page)[0].page + 1;
  }

}
