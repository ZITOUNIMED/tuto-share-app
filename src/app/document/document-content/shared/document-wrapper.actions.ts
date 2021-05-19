import {Action} from '@ngrx/store';
import {Element} from '../../shared/model/element.model';
import {Point} from './document-wrapper.state';

export const DOCUMENT_WRAPPER_INIT = 'DOCUMENT_WRAPPER_INIT';
export const DOCUMENT_WRAPPER_GO_TO_NEXT_PAGE = 'DOCUMENT_WRAPPER_GO_TO_NEXT_PAGE';
export const DOCUMENT_WRAPPER_MOVE_DOWN = 'DOCUMENT_WRAPPER_MOVE_DOWN';
export const DOCUMENT_WRAPPER_MOVE_UP = 'DOCUMENT_WRAPPER_MOVE_UP';
export const DOCUMENT_WRAPPER_MOVE_ELEMENT = 'DOCUMENT_WRAPPER_MOVE_ELEMENT';
export const DOCUMENT_WRAPPER_RETURN_TO_PREVIOUS_PAGE = 'DOCUMENT_WRAPPER_RETURN_TO_PREVIOUS_PAGE';
export const DOCUMENT_WRAPPER_SAVE_ELEMENT = 'DOCUMENT_WRAPPER_SAVE_ELEMENT';
export const DOCUMENT_WRAPPER_SELECT_ELEMENT = 'DOCUMENT_WRAPPER_SELECT_ELEMENT';
export const DOCUMENT_WRAPPER_INSERT_PAGE = 'DOCUMENT_WRAPPER_INSERT_PAGE';
export const DOCUMENT_WRAPPER_DELETE_ELEMENT = 'DOCUMENT_WRAPPER_DELETE_ELEMENT';
export const DOCUMENT_WRAPPER_CHANGE_EDIT_MODE = 'DOCUMENT_WRAPPER_CHANGE_EDIT_MODE';
export const DOCUMENT_WRAPPER_CANCEL_EDIT_ELEMENT = 'DOCUMENT_WRAPPER_CANCEL_EDIT_ELEMENT';
export const DOCUMENT_WRAPPER_DELETE_PAGE = 'DOCUMENT_WRAPPER_DELETE_PAGE';
export const DOCUMENT_WRAPPER_GO_TO_PAGE = 'DOCUMENT_WRAPPER_GO_TO_PAGE';
export const DOCUMENT_WRAPPER_MOVE_ROW = 'DOCUMENT_WRAPPER_MOVE_ROW';
export const DOCUMENT_WRAPPER_MOVE_PAGE = 'DOCUMENT_WRAPPER_MOVE_PAGE';
export const DOCUMENT_WRAPPER_DRAG_AND_DROP_ELEMENT = 'DOCUMENT_WRAPPER_DRAG_AND_DROP_ELEMENT';
export const DOCUMENT_WRAPPER_DRAG_AND_DROP_ENDED = 'DOCUMENT_WRAPPER_DRAG_AND_DROP_ENDED';

export type DocumentWrapperActions = DocumentWrapperInitAction |
  DocumentWrapperGoToNextPageAction |
  DocumentWrapperMoveDownAction |
  DocumentWrapperMoveUpAction |
  DocumentWrapperMoveElementAction |
  DocumentWrapperReturnToPreviousPageAction |
  DocumentWrapperSaveElementAction |
  DocumentWrapperInserPageAction |
  DocumentWrapperDeletePageAction |
  DocumentWrapperDeleteElementAction |
  DocumentWrapperChangeEditModeAction |
  DocumentWrapperCancelEditElementAction |
  DocumentWrapperSelectElementAction |
  DocumentWrapperGoToPageAction |
  DocumentWrapperMoveRowAction |
  DocumentWrapperMovePageAction |
  DocumentWrapperDragAndDropElementAction|
  DocumentWrapperDragAndDropEndedAction
  ;

export class DocumentWrapperInitAction implements Action {
  readonly type = DOCUMENT_WRAPPER_INIT;

  constructor(public payload: Element[]) {
  }
}

export class DocumentWrapperGoToNextPageAction implements Action {
  readonly type = DOCUMENT_WRAPPER_GO_TO_NEXT_PAGE;

  constructor(public payload: boolean) {
  }
}

export class DocumentWrapperMoveDownAction implements Action {
  readonly type = DOCUMENT_WRAPPER_MOVE_DOWN;

  constructor(public payload: Point) {
  }
}

export class DocumentWrapperMoveRowAction implements Action {
  readonly type = DOCUMENT_WRAPPER_MOVE_ROW;

  constructor(public payload: {
    previousRow: number,
    currentRow: number,
  }) {
  }
}

export class DocumentWrapperMovePageAction implements Action {
  readonly type = DOCUMENT_WRAPPER_MOVE_PAGE;

  constructor(public payload: {
    previousIndex: number,
    currentIndex: number,
  }) {
  }
}

export class DocumentWrapperMoveUpAction implements Action {
  readonly type = DOCUMENT_WRAPPER_MOVE_UP;

  constructor(public payload: Point) {
  }
}

export class DocumentWrapperMoveElementAction implements Action {
  readonly type = DOCUMENT_WRAPPER_MOVE_ELEMENT;

  constructor(public payload: Point) {
  }
}

export class DocumentWrapperDragAndDropElementAction implements Action {
  readonly type = DOCUMENT_WRAPPER_DRAG_AND_DROP_ELEMENT;

  constructor(public payload: Point) {
  }
}

export class DocumentWrapperDragAndDropEndedAction implements Action {
  readonly type = DOCUMENT_WRAPPER_DRAG_AND_DROP_ENDED;

  constructor(public payload: boolean) {
  }
}

export class DocumentWrapperReturnToPreviousPageAction implements Action {
  readonly type = DOCUMENT_WRAPPER_RETURN_TO_PREVIOUS_PAGE;

  constructor(public payload: boolean) {
  }
}

export class DocumentWrapperSaveElementAction implements Action {
  readonly type = DOCUMENT_WRAPPER_SAVE_ELEMENT;

  constructor(public payload: Element) {
  }
}

export class DocumentWrapperSelectElementAction implements Action {
  readonly type = DOCUMENT_WRAPPER_SELECT_ELEMENT;

  constructor(public payload: Element) {
  }
}

export class DocumentWrapperInserPageAction implements Action {
  readonly type = DOCUMENT_WRAPPER_INSERT_PAGE;

  constructor(public payload: boolean) {
  }
}

export class DocumentWrapperGoToPageAction implements Action {
  readonly type = DOCUMENT_WRAPPER_GO_TO_PAGE;

  constructor(public payload: {
    page: number,
    isBlurMode: boolean
  }) {
  }
}

export class DocumentWrapperDeletePageAction implements Action {
  readonly type = DOCUMENT_WRAPPER_DELETE_PAGE;

  constructor(public payload: boolean) {
  }
}

export class DocumentWrapperDeleteElementAction implements Action {
  readonly type = DOCUMENT_WRAPPER_DELETE_ELEMENT;

  constructor(public payload: Point) {
  }
}

export class DocumentWrapperChangeEditModeAction implements Action {
  readonly type = DOCUMENT_WRAPPER_CHANGE_EDIT_MODE;

  constructor(public payload: boolean) {
  }
}

export class DocumentWrapperCancelEditElementAction implements Action {
  readonly type = DOCUMENT_WRAPPER_CANCEL_EDIT_ELEMENT;

  constructor(public payload: boolean) {
  }
}
