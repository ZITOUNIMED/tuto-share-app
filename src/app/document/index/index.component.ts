import { Component, OnInit } from "@angular/core";
import { ElementType } from "../shared/element-type";
import { isNotEmptyArray } from "src/app/shared/app-utils";
import { Element } from '../shared/model/element.model';
import { AppStoreService } from "src/app/shared/service/app.store.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  ElementType = ElementType;
  showIndex = true;

  elements: Element[];

  constructor(public appStoreService: AppStoreService){}

  closeNav(page) {
    document.getElementById("mySidenav").style.width = "0";
    if(page>=0){
      this.appStoreService.goToPage(page);
    }
  }

  ngOnInit(){
    this.appStoreService.getDocumentWrapper()
    .subscribe(documentWrapperState => {
      this.elements = [];
      if(documentWrapperState && isNotEmptyArray(documentWrapperState.elements)){
        const pagesMap = new Map<number, Element[]>();
        documentWrapperState.elements.filter(elt => elt.type === ElementType.BIG_TITLE ||
          elt.type === ElementType.MEDIUM_TITLE ||
          elt.type === ElementType.SMALL_TITLE
        )
        .forEach(elt => {
          let pageElements = pagesMap.get(elt.page);
          if(isNotEmptyArray(pageElements)){
            pageElements.push(elt);
          } else {
            pagesMap.set(elt.page, [elt]);
          }
        });
        const keys = Array.from(pagesMap.keys());
        keys.sort((k1, k2) => k1 - k2)
        .forEach(k => {
          const elts = pagesMap.get(k).sort((e1, e2) => e1.row - e2.row);
          this.elements.push(...elts);
        });
      }
    });
  }
}
