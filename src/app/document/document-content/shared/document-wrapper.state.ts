import {Element} from '../../shared/model/element.model';

export interface DocumentWrapperState {
  elements: Element[];
  currentPageElements: Element[];
  currentPage: number;
  canReturnToPreviousPage: boolean;
  canGoToNextPage: boolean;
  biggerPage: number;
  movedItem: Point;
  biggestRowOfCurrentPage: number;
  editMode: boolean;
  selectedElement: Element;
  canMoveUp: boolean;
  canDeletePage: boolean;
  draggedElementPosition: Point;
  isLockedRepetition: boolean;
}

export interface Point {
  row: number;
  page: number;
}
