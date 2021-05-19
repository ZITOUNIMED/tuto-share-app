import { Action } from '@ngrx/store';
import { User } from './model/user.model';


export const USER_SAVE = 'USER_SAVE';
export const USER_CLEAN = 'USER_CLEAN';

export type UserActions = UserSaveAction | UserCleanAction;

export class UserSaveAction implements Action {
    readonly type = USER_SAVE;

    constructor(public payload: User) {}
}

export class UserCleanAction implements Action {
    readonly type = USER_CLEAN;

    constructor(public payload: boolean) {}
}
