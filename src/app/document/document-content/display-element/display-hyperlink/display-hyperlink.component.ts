import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-display-hyperlink',
  templateUrl: './display-hyperlink.component.html',
  styleUrls: ['./display-hyperlink.component.css']
})
export class DisplayHyperlinkComponent implements OnChanges {
  @Input() text;
  value= 'Link';
  link: string;
  constructor() { }

  ngOnChanges(changes) {
    if(changes && changes.text && changes.text.currentValue){
      let textObj = JSON.parse(changes.text.currentValue);
      this.link = textObj.link;
      this.value = textObj.value;
    }
  }

}
