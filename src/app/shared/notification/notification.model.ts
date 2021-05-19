export enum NotificationTypes {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
}

export interface Notification {
  readonly code: string;
  readonly type: NotificationTypes;
  message: string;
}
