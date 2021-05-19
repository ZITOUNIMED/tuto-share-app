import {Component, Input, OnChanges, OnInit, Output, EventEmitter} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import {DocumentService} from '../shared/service/document.service';
import {AppSnackbarService} from '../../shared/app-snackbar.service';
import {AppDocument} from '../shared/model/document.model';
import {AppStoreService} from '../../shared/service/app.store.service';
import {Observable} from 'rxjs';
import { first } from 'rxjs/operators';
import {DocumentWrapperState} from './shared/document-wrapper.state';
import {Element} from '../shared/model/element.model';

@Component({
  selector: 'app-document-content',
  templateUrl: './document-content.component.html',
  styleUrls: ['./document-content.component.css'],
})
export class DocumentContentComponent implements OnInit, OnChanges {
  @Input() doc: AppDocument;
  @Output() documentChaned= new EventEmitter<AppDocument>();
  documentWrapperState$: Observable<DocumentWrapperState>;

  constructor(private documentService: DocumentService,
              private appSnackbarService: AppSnackbarService,
              public appStoreService: AppStoreService) {
  }

  ngOnInit() {
    this.appStoreService.initDocumentWrapper(this.doc.elements);
    this.documentWrapperState$ = this.appStoreService.getDocumentWrapper();
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      this.appStoreService.moveRow(event.previousIndex, event.currentIndex);
    }
  }

  cdkDragMoved($event){
    if($event && $event.distance){
      if($event.distance.x>(window.innerWidth / 2)){
        this.appStoreService.goToNextPage(true);
      } else if(-$event.distance.x>(window.innerWidth / 2)) {
        this.appStoreService.returnToPreviousPage(true);
      }
    }
  }

  saveDocument() {
	this.documentWrapperState$
	.pipe(first())
	.subscribe( documentWrapperState =>{
    let elements= this.checkRowsOrder(documentWrapperState);
		const doc = {...this.doc, elements: elements};
		this.documentService.saveDocument(doc).subscribe(res => {
		  this.appSnackbarService.openSnackBar('Success!: Document Saved', 'save');
		  this.loadDocument();
		});
	});
  }

  private checkRowsOrder(documentWrapperState: DocumentWrapperState): Element[]{
    let currentPageElements = documentWrapperState.currentPageElements;
    let totalRows = 0;
    for(let i = 0; i<currentPageElements.length; i++){
      totalRows+=i;
    }

    const elt = currentPageElements.reduce((e1, e2) => {
      return {
        ...e1,
        row: e1.row + e2.row
      };
    });
    if(elt.row !== totalRows){
      let row = 0;
      return documentWrapperState.elements.map(elt => {
        if(elt.page === documentWrapperState.currentPage){
          elt.row = row++;
        }
        return elt;
      });
    }
    
    return documentWrapperState.elements;
  }

  loadDocument() {
    this.documentService.getDocument(this.doc.id).subscribe(doc => {
      this.doc = doc;
      this.documentChaned.emit(this.doc);
      this.appStoreService.initDocumentWrapper(this.doc.elements);
    });
  }

  cancelDocumentChanges() {
    this.loadDocument();
  }


  ngOnChanges(changes) {
    if (changes.doc) {
      this.appStoreService.initDocumentWrapper(this.doc.elements);
    }
  }
}
