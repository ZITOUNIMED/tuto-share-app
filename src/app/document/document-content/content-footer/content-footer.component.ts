import { Component, OnInit, Input } from '@angular/core';
import { AppDocument } from '../../shared/model/document.model';
import { Observable } from 'rxjs';
import { DocumentWrapperState } from '../shared/document-wrapper.state';
import { AppStoreService } from 'src/app/shared/service/app.store.service';
import { isNotEmptyArray } from 'src/app/shared/app-utils';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-content-footer',
  templateUrl: './content-footer.component.html',
  styleUrls: ['./content-footer.component.css']
})
export class ContentFooterComponent implements OnInit {
  @Input() documentWrapperState$: Observable<DocumentWrapperState>;
  @Input() doc: AppDocument;
  displayedPagesIndex = [];
  pagesIndex = [];
  currentSetIndex = 0;
  maxDisplayedPagesIndex = 7;
  
  constructor(public appStoreService: AppStoreService){}

  ngOnInit() {
    this.appStoreService.getDocumentWrapper()
    .subscribe(documentWrapperState => {
      if(documentWrapperState && isNotEmptyArray(documentWrapperState.elements)){
        let elements = documentWrapperState.elements;
        const biggerPage = elements.sort((e1, e2) => e2.page - e1.page)[0].page;
        this.pagesIndex= Array(biggerPage + 1).fill(0).map((x,i)=>i);
        this.applyMaxSise(window);
        this.applyDispayedPagesIndex();
      }
    });
  }

  previousSet(){
    if(this.currentSetIndex>0){
      this.currentSetIndex--;
      this.applyDispayedPagesIndex();
    }
  }

  nextSet(){
    if((this.currentSetIndex + 1) * this.maxDisplayedPagesIndex < this.pagesIndex.length){
      this.currentSetIndex++;
      this.applyDispayedPagesIndex();
    }
  }

  onResize($event){
    this.applyMaxSise($event.target);
    this.applyDispayedPagesIndex();
  }

  drop(event: CdkDragDrop<string[]>) {
    this.appStoreService.movePage(event.previousIndex, event.currentIndex);
  }

  myFunction(pageIndex){
    console.log(pageIndex);
  }

  private applyDispayedPagesIndex(){
    this.displayedPagesIndex = this.pagesIndex.slice(this.currentSetIndex * this.maxDisplayedPagesIndex,
      (this.currentSetIndex + 1) * this.maxDisplayedPagesIndex);
  }

  private applyMaxSise(window){
    this.maxDisplayedPagesIndex = window.innerWidth / 55;
  }
}
