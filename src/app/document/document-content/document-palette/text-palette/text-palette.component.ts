import {Component, forwardRef, OnInit} from '@angular/core';

import {AbstractPaletteComponent} from '../abstract-palette.component';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {MAX_TEXT_LENGTH} from 'src/app/document/shared/model/element.model';
import {ElementType} from "../../../shared/element-type";

@Component({
  selector: 'app-text-palette',
  templateUrl: './text-palette.component.html',
  styleUrls: ['./text-palette.component.css'],
  providers: [{
                 provide: NG_VALUE_ACCESSOR,
                 useExisting: forwardRef(() => TextPaletteComponent),
                 multi: true
               }
        ]
})
export class TextPaletteComponent extends AbstractPaletteComponent implements OnInit{
  MAX_TEXT_LENGTH = MAX_TEXT_LENGTH;

  ngOnInit(): void {
    if(!this.element.appElementContent.type){
      this.element.appElementContent = {
        ...this.element.appElementContent,
        type: ElementType.TEXT,
        text: '',
      };
    }
  }

  onTextChange($event){
    this.element.appElementContent = {
      ...this.element.appElementContent,
      text: $event,
    };
    this.onChange(this.element);
  }
}
