import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {finalize, catchError} from 'rxjs/internal/operators';
import { AppStoreService } from '../../../shared/service/app.store.service';
import { AppCollection } from '../model/app-collection.model';
import { AppCollectionService } from './app-collection.service';

@Injectable({
  providedIn: 'root'
})
export class AppCollectionResolverService implements Resolve<AppCollection> {
  constructor(private appCollectionService: AppCollectionService,
              private appStoreService: AppStoreService) {
  }

  resolve(route: ActivatedRouteSnapshot, unused: RouterStateSnapshot): Observable<AppCollection> {
    const id = route.paramMap.get('id');
    this.appStoreService.startLoading();
    return this.appCollectionService.getCollection(id)
      .pipe(
        catchError(error => {
          this.appStoreService.addErrorNotif(error.status, error.message);
          return throwError(error);
        }),
        finalize(() => {
          this.appStoreService.stopLoading();
        }),
      );
  }
}
