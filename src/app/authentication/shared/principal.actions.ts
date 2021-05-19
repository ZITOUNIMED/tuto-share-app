import { Action } from '@ngrx/store';

import { Principal } from './model/principal.model';

export const PRINCIPAL_SAVE = 'PRINCIPAL_SAVE';
export const PRINCIPAL_CLEAN = 'PRINCIPAL_CLEAN';

export type PrincipalActions = PrincipalSaveAction | PrincipalCleanAction;

export class PrincipalSaveAction implements Action {
  readonly type = PRINCIPAL_SAVE;

  constructor(public payload: Principal) { }
}

export class PrincipalCleanAction implements Action {
  readonly type = PRINCIPAL_CLEAN;
  constructor(public payload: boolean) { }
}
