import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from '@angular/forms';
import { AbstractPaletteComponent } from '../abstract-palette.component';
import { ElementType } from 'src/app/document/shared/element-type';


@Component({
  selector: 'app-list-palette',
  templateUrl: './list-palette.component.html',
  styleUrls: ['./list-palette.component.css'],
  providers: [{
                 provide: NG_VALUE_ACCESSOR,
                 useExisting: forwardRef(() => ListPaletteComponent),
                 multi: true
               }
      ]
})
export class ListPaletteComponent extends AbstractPaletteComponent implements OnInit {
  listForm: FormGroup;
  list= {title: '', items: []};
  
  ngOnInit(){
    let fb = new FormBuilder();
    
    this.listForm = fb.group({
      title: [''],
      newItem: ['']
    });
    
  }

  writeValue(value){
    if(value && value.text && !this.list.title){
      this.list = JSON.parse(value.text);
      this.listForm.get('title').setValue(this.list.title);
    }
    super.writeValue(value);
  }

  deleteItem(item){
    this.list.items = this.list.items.filter(i => i !== item);
    this.element.text = JSON.stringify(this.list);
    this.onChange(this.element);
  }

  changed(){
    if(this.element && this.element.type === ElementType.LIST){
      let title = this.listForm.get('title').value;
      this.list.title = title;
  
      this.element.text = JSON.stringify(this.list);
      this.onChange(this.element);
    }
  }

  addItem(){
    const item = this.listForm.get('newItem').value;
    this.list.items.push(item);
    this.element.text = JSON.stringify(this.list);
    this.listForm.get('newItem').setValue('');
    this.onChange(this.element);
  }
}
