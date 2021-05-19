import {LoadingState} from './loading.state';
import {PrincipalState} from '../authentication/shared/principal.state';
import {NotificationsState} from './notification/notifications.state';
import { UserState } from '../user/shared/user.state';
import { DocumentWrapperState} from '../document/document-content/shared/document-wrapper.state';
import { DocumentState } from '../document/shared/document.state';

export interface AppState {
  loadingState: LoadingState;
  principalState: PrincipalState;
  notificationsState: NotificationsState;
  userState: UserState;
  documentWrapperState: DocumentWrapperState;
  documentState: DocumentState;
}
