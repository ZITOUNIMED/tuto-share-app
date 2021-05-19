import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppCollection } from "../model/app-collection.model";
import { environment } from "../../../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class AppCollectionService {

  url = environment.base + environment.api + '/collection';
  constructor(private http: HttpClient) {}

  findAll() : Observable<AppCollection[]> {
      return this.http.get<AppCollection[]>(this.url);
  }

  save(collection: AppCollection): Observable<any>{
    return this.http.post(this.url, collection);
  }

  getCollection(id: string): Observable<AppCollection> {
    return this.http.get<AppCollection>(this.url + `/${id}`);
  }

  deleteCollection(id: number): Observable<any> {
    return this.http.delete(this.url + `/${id}`);
  }
}
