import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { AbstractPaletteComponent } from '../abstract-palette.component';
import { ElementType } from 'src/app/document/shared/element-type';


@Component({
  selector: 'app-hyperlink-palette',
  templateUrl: './hyperlink-palette.component.html',
  styleUrls: ['./hyperlink-palette.component.css'],
  providers: [{
                 provide: NG_VALUE_ACCESSOR,
                 useExisting: forwardRef(() => HyperlinkPaletteComponent),
                 multi: true
               }
      ]
})
export class HyperlinkPaletteComponent extends AbstractPaletteComponent implements OnInit{
  linkForm: FormGroup;
  
  ngOnInit(){
    let fb = new FormBuilder();
    this.linkForm = fb.group({
      value: [''],
      link: ['']
    });
  }

  writeValue(value){
    if(value && value.text){
      let linkObject = JSON.parse(value.text);
      this.linkForm.get('value').setValue(linkObject.value);
      this.linkForm.get('link').setValue(linkObject.link);
    }
    super.writeValue(value);
  }

  changed(){
    if(this.element.type === ElementType.HYPERLINK){
      let value = this.linkForm.get('value').value;
      let link = this.linkForm.get('link').value;
  
      this.element.text = JSON.stringify({value: value, link: link});
      this.onChange(this.element);
    }
  }
}
