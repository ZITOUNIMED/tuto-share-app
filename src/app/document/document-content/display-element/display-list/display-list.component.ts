import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.css']
})
export class DisplayListComponent implements OnChanges{
  @Input() text;
  list = {
    title: '',
    items: []
  };

  ngOnChanges(changes) {
    if(changes && changes.text && changes.text.currentValue){
      this.list = JSON.parse(changes.text.currentValue);
    }
  }
}
