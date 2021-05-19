import { ControlValueAccessor } from "@angular/forms";

import {Element, emptyElement} from '../../shared/model/element.model';

export abstract class AbstractPaletteComponent implements ControlValueAccessor {
  /** OnChange */
  private fnChange = (_: any) => {};

  /** OnTouched */
  private fnTouched = () => {};

  element: Element;

  writeValue(obj: any): void {
    if(obj){
      this.element = obj;
    } else {
        this.element = emptyElement();
    }
  }

  registerOnChange(fn: any): void {
    this.fnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.fnTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  protected onChange($event) {
    this.element = $event;
    this.fnChange($event);
  }

  protected onTouch($event){
  }

}
