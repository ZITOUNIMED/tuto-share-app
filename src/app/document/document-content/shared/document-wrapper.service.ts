import { DocumentWrapperGenericService } from "./document-wrapper-generic.service";
import { DocumentWrapperState, Point } from "./document-wrapper.state";
import {Element} from '../../shared/model/element.model';

const ROW_FLAG = -125;
const PAGE_FLAG = -523;

export class DocumentWrapperService implements DocumentWrapperGenericService {
    initDocument(elements: Element[]): DocumentWrapperState {
        return {
            elements: elements,
            currentPage: 0,
            movedItem: {row: -1, page: -1},
            biggestRowOfCurrentPage: -1,
            editMode: false,
            selectedElement: null,
            canMoveUp: true,
            canDeletePage: false,
            draggedElementPosition: null,
            isLockedRepetition: false,
          } as DocumentWrapperState;
    }

    moveUp(state, p: Point){
        const isTheFirst = !state.elements.some(
            elt => elt.page === p.page && elt.row < p.row
          );
        
          if (isTheFirst) {
            if (p.page > 0) {
              state.currentPage = p.page - 1;
              const biggestRow = this.getBiggestRowInPage(state, p.page - 1);
              let toP = null;
              if (biggestRow >= 0) {
                toP = {row: biggestRow + 1, page: p.page - 1};
              } else {
                toP = {row: 0, page: p.page - 1};
              }
              this.changeElementPosition(state, p, toP);
              this.moveToPosition(state, toP);
              this.decreaseRows(state, p.page);
            } else {
              // this.cantMoveUp = true;
              state.currentPage = p.page;
              const toP = {row: 0, page: p.page};
              this.moveToPosition(state, toP);
            }
          } else {
            const p1 = {row: p.row, page: p.page};
            const p2 = {row: p.row - 1, page: p.page};
            this.switchTowPositions(state, p1, p2);
            this.moveToPosition(state, p2);
            state.currentPage = p.page;
          }
    }

    moveDown(state: DocumentWrapperState, p: Point) {
        const isTheLast = !state.elements.some(
            elt => elt.page === p.page && elt.row > p.row
        );
        
        if (isTheLast) {
            state.currentPage = p.page + 1;
            this.increaseRows(state, p.page + 1);
            const toP = {row: 0, page: p.page + 1};
        
            this.changeElementPosition(state, p, toP);
            this.moveToPosition(state, toP);
        } else {
            const toP = {row: p.row + 1, page: p.page};
            this.switchTowPositions(state, p, toP);
            this.moveToPosition(state, toP);
            state.currentPage = p.page;
        }
    }

    dragAndDropEnded(state: DocumentWrapperState, accept: boolean){
      
    }

    moveRow(state: DocumentWrapperState, previousRow: number, currentRow: number){
      // move in the same page
      if(!state.draggedElementPosition ||
        state.draggedElementPosition.page === state.currentPage){
        const p = {
          row: previousRow,
          page: state.currentPage,
        };
        const toP = { 
          row: currentRow, 
          page: state.currentPage
        };
  
        this.putFlag(state, p);
        
        if(previousRow<currentRow){// move down
          this.decreaseRows(state, state.currentPage, previousRow + 1, currentRow);
        } else {// move up
          this.increaseRows(state, state.currentPage, currentRow, previousRow - 1);
        }
        
        this.applyPointOnFlag(state, toP);
      } else { // in other page
        const p = state.draggedElementPosition;
        const toP = { 
          row: currentRow, 
          page: state.currentPage,
        };

        // prepare element position in the new page
        this.increaseRows(state, state.currentPage, currentRow);

        // put element in the new position
        this.changeElementPosition(state, p, toP);

        // fill element position in last page
        this.decreaseRows(state, p.page, p.row + 1);

        state.isLockedRepetition = false;
      }

      state.draggedElementPosition = null;
    }

    movePage(state: DocumentWrapperState, previousPage: number, currentPage: number){
    }

    goToNextPage(state: DocumentWrapperState, isLockedRepetition?: boolean){
    }

    returnToPreviousPage(state: DocumentWrapperState, isLockedRepetition?: boolean){
    }

    goToPage(state: DocumentWrapperState, page: number, isBlurMode?: boolean){
    }

    insertPage(state: DocumentWrapperState, accept?: boolean){
    }

    deletePage(state: DocumentWrapperState, accept?: boolean){
    }

    moveElement(state: DocumentWrapperState, p: Point) {
    }

    dragAndDropElement(state: DocumentWrapperState, p: Point){
      state.draggedElementPosition = p;
    }

    saveElement(state: DocumentWrapperState, element: Element) {}

    deleteElement(state: DocumentWrapperState, p: Point) {
    }

    selectElement(state: DocumentWrapperState, element: Element){
    }

    cancelEditElement(state: DocumentWrapperState, accept?: boolean){
    }

    changeEditMode(state: DocumentWrapperState, accept?: boolean){
    }

    private getBiggestRowInPage(state: DocumentWrapperState, page): number {
        return null;
    }

    private changeElementPosition(state: DocumentWrapperState, p: Point, toP: Point) {
    }

    private moveToPosition(state: DocumentWrapperState, p?: Point) {
    }

    private increaseRows(state: DocumentWrapperState, page: number, fromRow?: number, toRow?: number) {
      }

    private decreaseRows(state: DocumentWrapperState, page: number, fromRow?: number, toRow?: number) {
    }
    
    private switchTowPositions(state: DocumentWrapperState, p1: Point, p2: Point) {
    }

    private getElementAtPosition(state: DocumentWrapperState, p: Point): Element {
        return null;
    }

    private shiftPagesRight(state: DocumentWrapperState, fromPage: number, toPage?: number) {
    }

    private shiftPagesLeft(state: DocumentWrapperState){}
    
    private doCancelEditElement(state: DocumentWrapperState){
    }

    private getBiggerPage(state: DocumentWrapperState) {
    }

    private putFlag(state: DocumentWrapperState, p: Point){
    }

    private applyPointOnFlag(state: DocumentWrapperState, p: Point){
    }

    private putFlagOnPage(state: DocumentWrapperState, page: number){
    }

    private applyPageOnFlag(state: DocumentWrapperState, page: number){
    }
}