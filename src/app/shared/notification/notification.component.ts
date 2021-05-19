import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {NotificationsState} from './notifications.state';
import {Notification, NotificationTypes} from './notification.model';
import {NotificationsRemoveAction} from "./notifications.actions";

@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[];
  NotificationTypes = NotificationTypes;

  constructor(private store: Store<NotificationsState>) { }

  ngOnInit() {
    this.store.select('notificationsState').subscribe(notificationsState => {
      const notifications = notificationsState && notificationsState.notifications || [];
      this.notifications = Array.from(new Set(notifications.map(notif => notif.message)))
       .map(message => notifications.find(notif => notif.message === message));
    });
  }

  removeNotification(notif: Notification) {
    this.store.dispatch(new NotificationsRemoveAction(notif));
  }

}
