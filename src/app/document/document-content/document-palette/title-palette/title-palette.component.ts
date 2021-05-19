import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractPaletteComponent } from '../abstract-palette.component';

@Component({
  selector: 'app-title-palette',
  templateUrl: './title-palette.component.html',
  styleUrls: ['./title-palette.component.css'],
  providers: [{
                 provide: NG_VALUE_ACCESSOR,
                 useExisting: forwardRef(() => TitlePaletteComponent),
                 multi: true
               }
        ]
})
export class TitlePaletteComponent extends AbstractPaletteComponent {
  onTextChange($event){
    this.element.text = $event;
    this.onChange(this.element);
  }
}
