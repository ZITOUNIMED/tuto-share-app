import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import { AppDocument } from '../model/document.model';
import { DocumentCollectionTypes } from '../document-collection-types';
import {PageModel} from "../../../shared/model/page.model";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  url = environment.base + environment.api + '/document';

  constructor(private http: HttpClient) {}

  getDocuments(collectionType?: DocumentCollectionTypes, page?: number, limit?: number, collectionId?: String): Observable<PageModel<AppDocument>> {
    let subUrl = '';
    if(collectionId){
      subUrl = this.getUrlByCollectionId(collectionId);
    } else {
      subUrl = this.getUrlByCollectionType(collectionType);
    }

    return this.http.get<PageModel<AppDocument>>(this.url + '/' + subUrl + `?page=${page>=0 ? page : 0}&limit=${limit>0 ? limit : 5}`);
  }

  private getUrlByCollectionId(collectionId: String): string {
    return `byCollectionId/${collectionId}`;
  }

  private getUrlByCollectionType(collectionType: DocumentCollectionTypes): string {
    switch(collectionType){
      case DocumentCollectionTypes.PUBLIC_TUTOS:
        return 'publicDocuments';
      case DocumentCollectionTypes.MY_FAVORITE_TUTOS:
        return 'myFavoriteDocuments';
      case DocumentCollectionTypes.MY_TUTOS:
        return 'myDocuments';
      case DocumentCollectionTypes.ALL_TUTOS:
        return 'all';
      default: return 'publicDocuments';
    }
  }

  getDocument(id: number|string): Observable<AppDocument> {
    return this.http.get<AppDocument>(this.url + `/${id}`);
  }

  saveDocument(document: AppDocument): Observable<any> {
    return this.http.post(this.url, document);
  }

  saveAllDocuments(documents: AppDocument[]): Observable<any> {
    return this.http.post(this.url + '/all', documents);
  }

  getTutoslight(collectionType?: DocumentCollectionTypes): Observable<AppDocument[]> {
    let subUrl = this.getUrlByCollectionType(collectionType);
    return this.http.get<AppDocument[]>(this.url + '/light/' + subUrl);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(this.url + `/${id}`);
  }

  wakeUp(): Observable<any> {
    return this.http.get(this.url + '/up');
  }

  exportDocumentPdf(appDocument: AppDocument): Observable<any>{
    return this.http.post(this.url + '/export-pdf', appDocument, { responseType:'blob' });
  }
}
