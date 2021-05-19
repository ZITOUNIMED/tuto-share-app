import {NotificationsState} from './notifications.state';
import {NOTIFICATIONS_ADD, NOTIFICATIONS_CLEAN, NOTIFICATIONS_REMOVE, NotificationsActions} from './notifications.actions';

export function notificationsReducer(state: NotificationsState, action: NotificationsActions) {
  switch (action.type) {
    case NOTIFICATIONS_ADD:
      const notifs = state && state.notifications ? state.notifications : [];
      notifs.push(action.payload);
      return {
        ...state,
        notifications: notifs
      };
    case NOTIFICATIONS_REMOVE:
      const notifications = state && state.notifications ? state.notifications : [];
      return {
        ...state,
        notifications: notifications.filter(notif => notif !== action.payload)
      };
    case NOTIFICATIONS_CLEAN:
      return action.payload ? null : state;
   default: return state;
  }
}
