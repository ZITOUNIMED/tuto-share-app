import { UserState } from './user.state';
import {UserActions, USER_SAVE, USER_CLEAN} from './user.actions';

export function userReducer(state: UserState, action: UserActions) {
  switch (action.type) {
    case USER_SAVE:
      return {
        ...state,
        user: action.payload
      };
    case USER_CLEAN:
      return action.payload ? null : state;
    default:
      return state;
  }
}
