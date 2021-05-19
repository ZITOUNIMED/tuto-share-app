import {
  DOCUMENT_WRAPPER_GO_TO_NEXT_PAGE,
  DOCUMENT_WRAPPER_INIT,
  DOCUMENT_WRAPPER_MOVE_DOWN,
  DOCUMENT_WRAPPER_MOVE_ELEMENT,
  DOCUMENT_WRAPPER_RETURN_TO_PREVIOUS_PAGE,
  DOCUMENT_WRAPPER_SAVE_ELEMENT,
  DOCUMENT_WRAPPER_INSERT_PAGE,
  DOCUMENT_WRAPPER_DELETE_ELEMENT,
  DOCUMENT_WRAPPER_MOVE_UP,
  DOCUMENT_WRAPPER_CHANGE_EDIT_MODE,
  DOCUMENT_WRAPPER_CANCEL_EDIT_ELEMENT,
  DOCUMENT_WRAPPER_SELECT_ELEMENT,
  DOCUMENT_WRAPPER_DELETE_PAGE,
  DOCUMENT_WRAPPER_GO_TO_PAGE,
  DOCUMENT_WRAPPER_MOVE_ROW,
  DocumentWrapperActions,
  DOCUMENT_WRAPPER_MOVE_PAGE,
  DOCUMENT_WRAPPER_DRAG_AND_DROP_ELEMENT,
  DOCUMENT_WRAPPER_DRAG_AND_DROP_ENDED
} from './document-wrapper.actions';
import {DocumentWrapperState, Point} from './document-wrapper.state';
import {Element} from '../../shared/model/element.model';
import { DocumentWrapperService } from './document-wrapper.service';
import { DocumentWrapperGenericService } from './document-wrapper-generic.service';

const service:DocumentWrapperGenericService = new DocumentWrapperService();

export function documentWrapperReducer(state: DocumentWrapperState, action: DocumentWrapperActions) {
  switch (action.type) {
    case DOCUMENT_WRAPPER_INIT:
      const initState = service.initDocument(action.payload);
      return buildWrapper(initState);
      
    case DOCUMENT_WRAPPER_GO_TO_NEXT_PAGE:
      service.goToNextPage(state, action.payload);
      return buildWrapper(state);

    case DOCUMENT_WRAPPER_GO_TO_PAGE:
      service.goToPage(state, action.payload.page, action.payload.isBlurMode);
      return buildWrapper(state);

    case DOCUMENT_WRAPPER_RETURN_TO_PREVIOUS_PAGE:
      service.returnToPreviousPage(state, action.payload);
      return buildWrapper(state);

    case DOCUMENT_WRAPPER_MOVE_ELEMENT:
      service.moveElement(state, action.payload as Point);
      return buildWrapper(state);

    case DOCUMENT_WRAPPER_MOVE_DOWN:
      service.moveDown(state, action.payload as Point);
      return buildWrapper(state);

    case DOCUMENT_WRAPPER_MOVE_UP:
      service.moveUp(state, action.payload as Point);
      return buildWrapper(state);

    case DOCUMENT_WRAPPER_MOVE_ROW:
      const {previousRow, currentRow} = action.payload;
      service.moveRow(state, previousRow, currentRow);
      return buildWrapper(state);

    case DOCUMENT_WRAPPER_SAVE_ELEMENT:
      service.saveElement(state, action.payload as Element)
      return buildWrapper(state);
    
    case DOCUMENT_WRAPPER_DRAG_AND_DROP_ELEMENT:
      service.dragAndDropElement(state, action.payload as Point)
      return buildWrapper(state);

    case DOCUMENT_WRAPPER_INSERT_PAGE:
      service.insertPage(state, action.payload as boolean);
      return buildWrapper(state);

    case DOCUMENT_WRAPPER_DELETE_PAGE:
      service.deletePage(state, action.payload as boolean);
    return buildWrapper(state);
    
    case DOCUMENT_WRAPPER_MOVE_PAGE:
      service.movePage(state, action.payload.previousIndex, action.payload.currentIndex);
      return buildWrapper(state);

    case DOCUMENT_WRAPPER_DELETE_ELEMENT:
      service.deleteElement(state, action.payload as Point);
      return buildWrapper(state);

    case DOCUMENT_WRAPPER_CHANGE_EDIT_MODE:
      service.changeEditMode(state, action.payload);
      return state;
    
    case DOCUMENT_WRAPPER_SELECT_ELEMENT:
      service.selectElement(state, action.payload as Element);
      return state;
      
    case DOCUMENT_WRAPPER_CANCEL_EDIT_ELEMENT:
      service.cancelEditElement(state, action.payload);
      return state;
    
    case DOCUMENT_WRAPPER_DRAG_AND_DROP_ENDED:
      service.dragAndDropEnded(state, action.payload as boolean);
      return state;
    default:
      return state;
  }
}

function buildWrapper(state: DocumentWrapperState) {
  return {...state};
}

function getBiggestRowInPage(state: DocumentWrapperState, page): number {
  const elts = state.elements.filter(elt => elt.page === page);
  return elts && elts.length > 0 ? Math.max(...elts.map(elt => elt.row)) : -1;
}

function checkCanDeletePage(state: DocumentWrapperState){
  return !!state.elements.length || state.currentPage>0;
}

function checkCanMoveUp(state: DocumentWrapperState){
  return !!(state.movedItem.row>0 || state.movedItem.row===0 && state.movedItem.page>0);
}

function getCurrentPageElements(state: DocumentWrapperState) {
  return state && state.elements && state.elements
  .filter(elt => {
    let ok = false;
    if(state.draggedElementPosition && (elt.row === state.draggedElementPosition.row &&
      elt.page === state.draggedElementPosition.page)){
      ok = true;
    }

    if(elt.page === state.currentPage){
      ok = true;
    }
    // elt.page === state.currentPage &&
    // (state.draggedElementPosition && elt.row !== state.draggedElementPosition.row ||
    //    !state.draggedElementPosition));
    //    return ok;
    return ok;
    });
}

function getBiggerPage(state: DocumentWrapperState) {
  return state.elements && state.elements.length && state.elements.sort((e1, e2) => e2.page - e1.page)[0].page;
}

function checkCanGoToNextPage(state: DocumentWrapperState) {
  return (
    state.elements &&
    state.elements.some(element => element.page > state.currentPage)
  );
}

function checkCanReturnToPreviousPage(state: DocumentWrapperState) {
 return !!(state.currentPage > 0);
}

function sortElements(state: DocumentWrapperState) {
  return state.currentPageElements.sort((e1, e2) => e1.row - e2.row);
}
