import {Action} from '@ngrx/store';
import {AppDocument} from './model/document.model';

export const DOCUMENT_SELECT = 'DOCUMENT_SELECT';

export type DocumentActions = DocumentSelectAction;

export class DocumentSelectAction implements Action {
  readonly type = DOCUMENT_SELECT;

  constructor(public payload: AppDocument) {
  }
}
