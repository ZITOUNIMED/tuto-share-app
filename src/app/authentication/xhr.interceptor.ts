import {Injectable} from '@angular/core';
import {PrincipalState} from './shared/principal.state';
import {Store} from '@ngrx/store';
import {HttpHandler, HttpRequest} from '@angular/common/http';

@Injectable()
export class XhrInterceptor {
  constructor(private store: Store<PrincipalState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let xhr = req;
    this.store.select('principalState')
      .subscribe(state => {
        if (state && state.principal && state.principal.token) {
          xhr = req.clone({
            headers: req.headers.set('authorization', `Bearer ${state.principal.token}`)
          });
        }
      });
    return next.handle(xhr);
  }
}
