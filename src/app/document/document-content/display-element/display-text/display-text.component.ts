import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-display-text',
  templateUrl: './display-text.component.html',
  styleUrls: ['./display-text.component.css']
})
export class DisplayTextComponent implements OnChanges {
  @Input() text;
  textLines = [];
  constructor() { }

  ngOnChanges(changes) {
    if(changes && changes.text && changes.text.currentValue){
      this.textLines = this.text.split('\n');
      this.textLines = this.textLines.map(line => line.replace(/ /g, '&nbsp;'));
    }
  }

}
