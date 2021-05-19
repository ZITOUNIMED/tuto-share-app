import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Notification, NotificationTypes } from '../notification/notification.model';
import { NotificationsAddAction, NotificationsCleanAction } from '../notification/notifications.actions';
import {StartLoadingAction, StopLoadingAction} from '../loading.actions';
import {map} from 'rxjs/internal/operators';
import {UserState} from '../../user/shared/user.state';
import {Observable} from 'rxjs';
import {Element} from '../../document/shared/model/element.model';
import {AppDocument} from '../../document/shared/model/document.model';
import {
  DocumentWrapperGoToNextPageAction,
  DocumentWrapperInitAction, DocumentWrapperMoveDownAction, DocumentWrapperMoveElementAction,
  DocumentWrapperReturnToPreviousPageAction, DocumentWrapperSaveElementAction,
  DocumentWrapperInserPageAction, DocumentWrapperDeleteElementAction,
  DocumentWrapperMoveUpAction, DocumentWrapperChangeEditModeAction,
  DocumentWrapperCancelEditElementAction,
  DocumentWrapperSelectElementAction, DocumentWrapperDeletePageAction,
  DocumentWrapperGoToPageAction,
  DocumentWrapperMoveRowAction,
  DocumentWrapperMovePageAction,
  DocumentWrapperDragAndDropElementAction,
  DocumentWrapperDragAndDropEndedAction,
} from '../../document/document-content/shared/document-wrapper.actions';
import {DocumentWrapperState, Point} from '../../document/document-content/shared/document-wrapper.state';
import { oc } from '../app-utils';
import { DocumentSelectAction } from 'src/app/document/shared/document.actions';
import { DocumentState } from 'src/app/document/shared/document.state';
import { User } from 'src/app/user/shared/model/user.model';
import {Principal} from '../../authentication/shared/model/principal.model';
import {PrincipalState} from '../../authentication/shared/principal.state';
import {LoadingState} from "../loading.state";

@Injectable()
export class AppStoreService {
  constructor(private store: Store<AppState>) {}

  addErrorNotif(code: string, message: string) {
      const notif: Notification = {
          code: code,
          type: NotificationTypes.ERROR,
          message: message
      };
      this.store.dispatch(new NotificationsAddAction(notif));
  }

  cleanNotification(accept?: boolean) {
    this.store.dispatch(new NotificationsCleanAction(accept));
  }

  startLoading() {
    this.store.dispatch(new StartLoadingAction());
  }

  stopLoading() {
    this.store.dispatch(new StopLoadingAction());
  }

  getUser(): Observable<User> {
    return this.store.select('userState')
      .pipe(map((userState: UserState) => {
        if (userState && userState.user) {
        return oc(userState).user;
      }
    }));
  }

  getDocumentWrapper(): Observable<DocumentWrapperState> {
      return this.store.select('documentWrapperState');
  }

  initDocumentWrapper(elements: Element[]) {
      this.store.dispatch(new DocumentWrapperInitAction(elements));
  }

  goToNextPage(isLockedRepetition?: boolean) {
      this.store.dispatch(new DocumentWrapperGoToNextPageAction(isLockedRepetition));
  }

  goToPage(page: number, isBlurMode?: boolean){
    this.store.dispatch(new DocumentWrapperGoToPageAction({
      page: page,
      isBlurMode: isBlurMode
    }));
  }

  moveDown(point: Point) {
    this.store.dispatch(new DocumentWrapperMoveDownAction(point));
  }

  moveUp(point: Point) {
    this.store.dispatch(new DocumentWrapperMoveUpAction(point));
  }

  moveElement(point: Point) {
    this.store.dispatch(new DocumentWrapperMoveElementAction(point));
  }

  dragAndDropElement(point: Point){
    this.store.dispatch(new DocumentWrapperDragAndDropElementAction(point));
  }

  moveRow(previousRow: number, currentRow: number){
    this.store.dispatch(new DocumentWrapperMoveRowAction({previousRow: previousRow, currentRow: currentRow}));
  }

  returnToPreviousPage(isLockedRepetition?: boolean) {
    this.store.dispatch(new DocumentWrapperReturnToPreviousPageAction(isLockedRepetition));
  }

  dragAndDropEnded(accept?: boolean){
    this.store.dispatch(new DocumentWrapperDragAndDropEndedAction(accept));
  }

  saveElement(element: Element) {
    this.store.dispatch(new DocumentWrapperSaveElementAction(element));
  }

  insertPage(accept?: boolean) {
    this.store.dispatch(new DocumentWrapperInserPageAction(accept));
  }

  deletePage(accept?: boolean){
    this.store.dispatch(new DocumentWrapperDeletePageAction(accept));
  }

  deleteElement(p: Point) {
    this.store.dispatch(new DocumentWrapperDeleteElementAction(p));
  }

  changeEditMode(accept?: boolean) {
    this.store.dispatch(new DocumentWrapperChangeEditModeAction(accept));
  }

  cancelEditElement(accept?: boolean) {
    this.store.dispatch(new DocumentWrapperCancelEditElementAction(accept));
  }

  movePage(previousIndex, currentIndex){
    this.store.dispatch(new DocumentWrapperMovePageAction(
      {previousIndex: previousIndex, currentIndex: currentIndex}
      ));
  }

  selectElement(element: Element) {
    this.store.dispatch(new DocumentWrapperSelectElementAction(element));
  }

  selectDocument(doc: AppDocument) {
    this.store.dispatch(new DocumentSelectAction(doc));
  }

  getDocument(): Observable<Document> {
      return this.store.select('documentState')
      .pipe(map((documentState: DocumentState) => {
        if (documentState && documentState.doc) {
        return oc(documentState).doc;
      }
    }));
  }

  getPrincipal(): Observable<Principal> {
    return this.store.select('principalState')
      .pipe(map((principalState: PrincipalState) => {
       return oc(principalState).principal;
      }));
  }

  checkLoading(): Observable<boolean> {
    return this.store.select('loadingState')
      .pipe(map((loadingState: LoadingState) => loadingState && loadingState.loading));
  }
}
