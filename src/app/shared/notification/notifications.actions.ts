import {Action} from '@ngrx/store';
import {Notification} from './notification.model';

export const NOTIFICATIONS_ADD = 'NOTIFICATIONS_ADD';
export const NOTIFICATIONS_REMOVE = 'NOTIFICATIONS_REMOVE';
export const NOTIFICATIONS_CLEAN = 'NOTIFICATIONS_CLEAN';

export type NotificationsActions = NotificationsAddAction | NotificationsRemoveAction | NotificationsCleanAction;

export class NotificationsAddAction implements Action {
  readonly type = NOTIFICATIONS_ADD;
  constructor(public payload: Notification) {}
}

export class NotificationsRemoveAction implements Action {
  readonly type = NOTIFICATIONS_REMOVE;
  constructor(public payload: Notification) {}
}

export class NotificationsCleanAction implements Action {
  readonly type = NOTIFICATIONS_CLEAN;
  constructor(public payload: boolean) {}
}
